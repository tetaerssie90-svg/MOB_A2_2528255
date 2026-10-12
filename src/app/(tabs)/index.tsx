import { Alert, Linking, Text, View } from "react-native";
import { router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { BriefcaseIcon, MapPinIcon, UserIcon } from "react-native-heroicons/outline";
import { Screen, ScreenScroll } from "../../components/ui/Screen";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Chip } from "../../components/ui/Chip";
import { Notice } from "../../components/ui/Notice";
import { ActionTile } from "../../components/ui/ActionTile";
import { DottedLine } from "../../components/ui/Dotted";
import { HeroPortrait } from "../../components/profile/HeroPortrait";
import { AvailabilityBadge } from "../../components/profile/AvailabilityBadge";
import { VerificationCode } from "../../components/profile/VerificationCode";
import { useProfile } from "../../context/ProfileContext";
import { accents, colors } from "../../design-system/colors";
import { student } from "../../constants/student";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const enter = (i: number) => FadeInDown.delay(80 + i * 90).duration(450);

export default function HomeScreen() {
  const { profile, status } = useProfile();
  const insets = useSafeAreaInsets();

  const contact = async () => {
    try {
      await Linking.openURL(student.linkedinUrl);
    } catch {
      Alert.alert("Can't open LinkedIn", "This link needs an internet connection and a browser.");
    }
  };

  return (
    <Screen>
      <View style={{ height: insets.top }} />
      <ScreenScroll>
        <Animated.View entering={enter(0)} className="items-center gap-2 px-2 pt-4">
          {/* The assignment requires this to be the first sentence on Home */}
          <Text accessibilityRole="header" className="text-center font-title text-[28px]" style={{ color: colors.text, lineHeight: 36, letterSpacing: -0.6 }}>
            My name is <Text style={{ color: colors.accentText }}>{`${student.fullName}.`}</Text>
          </Text>
          <Text className="text-center font-body-semibold text-[15px]" style={{ color: colors.accentText }}>
            {profile.headline}
          </Text>
          <View className="mt-1">
            <AvailabilityBadge value={profile.availability} centered />
          </View>
        </Animated.View>

        <Animated.View entering={enter(1)} className="items-center" style={{ marginBottom: profile.imageUri ? 0 : -44 }}>
          <HeroPortrait uri={profile.imageUri} />
        </Animated.View>

        {status === "error" ? (
          <Notice tone="warning" message="Your saved profile couldn't be read, so the default profile is shown." />
        ) : null}

        <Animated.View entering={enter(2)} style={{ zIndex: 1 }}>
          <Card className="gap-4">
            <View className="flex-row flex-wrap items-center justify-between gap-3">
              <Text className="font-body-bold text-base" style={{ color: colors.text, lineHeight: 22 }}>
                Can I help you?{"\n"}Let's work together.
              </Text>
              <Button label="Contact me" onPress={() => void contact()} accessibilityHint="Opens LinkedIn. Needs an internet connection." />
            </View>
            <View className="flex-row gap-3">
              <ActionTile title={"know\nmy work"} icon={BriefcaseIcon} accent={accents[0]} onPress={() => router.navigate("/projects")} />
              <ActionTile title={"about\nme"} icon={UserIcon} accent={accents[1]} onPress={() => router.navigate("/skills")} />
              <ActionTile title={"where\nI am"} icon={MapPinIcon} accent={accents[2]} onPress={() => router.navigate("/about")} />
            </View>
          </Card>
        </Animated.View>

        <Animated.View entering={enter(3)}>
          <Card className="gap-4">
            <Text className="font-body-bold text-lg" style={{ color: colors.text }}>
              A little about me
            </Text>
            <Text className="font-body text-[15px]" style={{ color: colors.textSecondary, lineHeight: 24 }}>
              {profile.bio}
            </Text>
            <DottedLine />
            <View className="flex-row flex-wrap items-center justify-between gap-3">
              <View className="gap-1.5">
                <Text className="font-body-medium text-xs" style={{ color: colors.textMuted }}>
                  Primary skill
                </Text>
                <Chip label={profile.primarySkill} />
              </View>
              <VerificationCode />
            </View>
          </Card>
        </Animated.View>

        <Text className="text-center font-body-medium text-xs" style={{ color: colors.textSecondary }}>
          {student.programme} · {student.institution} · works offline
        </Text>
      </ScreenScroll>
    </Screen>
  );
}
