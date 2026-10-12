import { useEffect, useMemo, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { CameraIcon, PhotoIcon } from "react-native-heroicons/outline";
import { Screen, ScreenScroll, TabScreenHeader } from "../../components/ui/Screen";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { FormField } from "../../components/ui/FormField";
import { Notice } from "../../components/ui/Notice";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { PressableScale } from "../../components/ui/PressableScale";
import { ProfileAvatar } from "../../components/profile/ProfileAvatar";
import { useProfile } from "../../context/ProfileContext";
import { useProfileImagePicker } from "../../hooks/useProfileImagePicker";
import { useHaptics } from "../../hooks/useHaptics";
import { colors } from "../../design-system/colors";
import { MIN_TOUCH } from "../../design-system/spacing";
import type { EditableProfile, ProfileErrors } from "../../types";
import { availabilityOptions } from "../../utils/availability";
import { deleteProfileImage } from "../../utils/profileImage";
import { hasErrors, limits, validateProfile } from "../../utils/validation";

type SaveState = { tone: "success" | "error"; message: string } | null;

export default function ProfileEditorScreen() {
  const { profile, update, reset, isCustomised } = useProfile();
  const picker = useProfileImagePicker();
  const haptics = useHaptics();

  const [draft, setDraft] = useState<EditableProfile>(profile);
  const [touched, setTouched] = useState<Partial<Record<keyof EditableProfile, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>(null);

  // Re-sync the form when the stored profile changes (initial load, save or reset).
  useEffect(() => {
    setDraft(profile);
  }, [profile]);

  const errors = useMemo(() => validateProfile(draft), [draft]);
  const visibleErrors: ProfileErrors = Object.fromEntries(
    Object.entries(errors).filter(([key]) => submitted || touched[key as keyof EditableProfile])
  );
  const isDirty = JSON.stringify(draft) !== JSON.stringify(profile);

  const setField = <K extends keyof EditableProfile>(key: K, value: EditableProfile[K]) => {
    setSaveState(null);
    setDraft((d) => ({ ...d, [key]: value }));
  };
  const touch = (key: keyof EditableProfile) => setTouched((t) => ({ ...t, [key]: true }));

  /** Unsaved picker copies are deleted so they don't pile up in the app folder */
  const replaceDraftImage = async (nextUri: string | null) => {
    if (draft.imageUri && draft.imageUri !== profile.imageUri) {
      await deleteProfileImage(draft.imageUri);
    }
    setField("imageUri", nextUri);
  };

  const onPick = async (source: "camera" | "library") => {
    const uri = source === "camera" ? await picker.takePhoto() : await picker.chooseFromLibrary();
    if (uri) await replaceDraftImage(uri);
  };

  const onRemovePhoto = () => {
    Alert.alert("Remove photo?", "Your initials avatar will be shown instead. Save to keep this change.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          void replaceDraftImage(null);
          picker.setFeedback({ tone: "info", message: "Photo removed. Tap Save profile to confirm." });
        },
      },
    ]);
  };

  const onSave = async () => {
    setSubmitted(true);
    if (hasErrors(errors)) {
      haptics.error();
      setSaveState({ tone: "error", message: "Fix the highlighted fields before saving." });
      return;
    }
    setSaving(true);
    try {
      await update({
        ...draft,
        headline: draft.headline.trim(),
        bio: draft.bio.trim(),
        primarySkill: draft.primarySkill.trim(),
      });
      haptics.success();
      setSubmitted(false);
      setTouched({});
      picker.setFeedback(null);
      setSaveState({ tone: "success", message: "Profile saved on this device. It will still be here after a restart." });
    } catch {
      haptics.error();
      setSaveState({ tone: "error", message: "Couldn't save right now. Your changes are still in the form — try again." });
    } finally {
      setSaving(false);
    }
  };

  const onDiscard = () => {
    void replaceDraftImage(profile.imageUri);
    setDraft(profile);
    setTouched({});
    setSubmitted(false);
    picker.setFeedback(null);
    setSaveState(null);
  };

  const onReset = () => {
    Alert.alert(
      "Reset profile?",
      "This deletes your saved headline, biography, skill, availability and photo from this device.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            if (draft.imageUri && draft.imageUri !== profile.imageUri) await deleteProfileImage(draft.imageUri);
            await reset();
            setTouched({});
            setSubmitted(false);
            picker.setFeedback(null);
            setSaveState({ tone: "success", message: "Saved profile deleted. Default details restored." });
          },
        },
      ]
    );
  };

  return (
    <Screen>
      <TabScreenHeader title="Edit profile" subtitle="Saved privately on this device" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScreenScroll>
          <Animated.View entering={FadeInDown.delay(60).duration(400)}>
            <Card className="items-center gap-5">
              <ProfileAvatar uri={draft.imageUri} size={120} />
              <View className="w-full flex-row gap-3">
                <Button
                  style={{ flex: 1 }}
                  label={draft.imageUri ? "Retake" : "Camera"}
                  icon={CameraIcon}
                  variant="outline"
                  loading={picker.busy}
                  onPress={() => void onPick("camera")}
                />
                <Button
                  style={{ flex: 1 }}
                  label={draft.imageUri ? "Replace" : "Gallery"}
                  icon={PhotoIcon}
                  variant="outline"
                  disabled={picker.busy}
                  onPress={() => void onPick("library")}
                />
              </View>
              {draft.imageUri ? <Button label="Remove photo" variant="ghost" onPress={onRemovePhoto} /> : null}
              {picker.feedback ? (
                <View className="w-full">
                  <Notice tone={picker.feedback.tone} message={picker.feedback.message} />
                </View>
              ) : null}
            </Card>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(160).duration(400)}>
            <Card className="gap-6">
              <SectionHeader title="Profile details" description="All fields are required." />

              <FormField
                label="Professional headline"
                value={draft.headline}
                onChangeText={(t) => setField("headline", t)}
                onBlur={() => touch("headline")}
                error={visibleErrors.headline}
                hint={`${limits.headlineMin}–${limits.headlineMax} characters, e.g. "Mobile developer in training".`}
                maxLength={limits.headlineMax}
                returnKeyType="next"
              />

              <FormField
                label="Short biography"
                value={draft.bio}
                onChangeText={(t) => setField("bio", t)}
                onBlur={() => touch("bio")}
                error={visibleErrors.bio}
                hint={`${limits.bioMin}–${limits.bioMax} characters. No links or emails.`}
                maxLength={limits.bioMax}
                multiline
              />

              <FormField
                label="Primary skill"
                value={draft.primarySkill}
                onChangeText={(t) => setField("primarySkill", t)}
                onBlur={() => touch("primarySkill")}
                error={visibleErrors.primarySkill}
                hint="Your strongest skill, e.g. React Native."
                maxLength={limits.skillMax}
                autoCapitalize="words"
              />

              <View className="gap-3" accessibilityRole="radiogroup" accessibilityLabel="Availability status">
                <Text className="font-body-bold text-sm" style={{ color: colors.text }}>
                  Availability status
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {availabilityOptions.map((option) => {
                    const selected = draft.availability === option.value;
                    return (
                      <PressableScale
                        key={option.value}
                        accessibilityRole="radio"
                        accessibilityState={{ checked: selected }}
                        accessibilityLabel={option.label}
                        onPress={() => setField("availability", option.value)}
                      >
                        <View
                          style={{
                            borderRadius: 999,
                            borderWidth: 1.5,
                            borderColor: selected ? option.color : colors.primarySoft,
                            backgroundColor: selected ? option.background : colors.surfaceSolid,
                          }}
                        >
                          <View className="flex-row items-center gap-2 px-4" style={{ minHeight: MIN_TOUCH }}>
                            {selected ? <View className="h-2 w-2 rounded-full" style={{ backgroundColor: option.color }} /> : null}
                            <Text
                              className={selected ? "font-body-bold text-sm" : "font-body-medium text-sm"}
                              style={{ color: selected ? option.color : colors.textSecondary }}
                            >
                              {option.label}
                            </Text>
                          </View>
                        </View>
                      </PressableScale>
                    );
                  })}
                </View>
                {visibleErrors.availability ? (
                  <Text className="font-body-semibold text-[13px]" style={{ color: colors.error }}>
                    {visibleErrors.availability}
                  </Text>
                ) : null}
              </View>
            </Card>
          </Animated.View>

          {saveState ? <Notice tone={saveState.tone} message={saveState.message} /> : null}

          <View className="gap-2">
            <Button
              label="Save profile"
              loading={saving}
              disabled={!isDirty && !submitted}
              accessibilityHint="Validates the form and saves it on this device"
              onPress={() => void onSave()}
            />
            {isDirty ? <Button label="Discard changes" variant="ghost" onPress={onDiscard} /> : null}
            {isCustomised ? <Button label="Reset saved profile" variant="danger" onPress={onReset} /> : null}
          </View>
        </ScreenScroll>
      </KeyboardAvoidingView>
    </Screen>
  );
}
