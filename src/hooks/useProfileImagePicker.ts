import { useCallback, useState } from "react";
import { Alert, Linking } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { persistProfileImage } from "../utils/profileImage";

export type PickerFeedback = {
  tone: "info" | "warning" | "error" | "success";
  message: string;
};

type Source = "camera" | "library";

const pickerOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ["images"],
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.7,
};

function showSettingsPrompt(what: string) {
  Alert.alert(
    `${what} access is off`,
    `Allow ${what.toLowerCase()} access in Settings to use this option. You can keep using the app without it.`,
    [
      { text: "Not now", style: "cancel" },
      { text: "Open Settings", onPress: () => void Linking.openSettings() },
    ]
  );
}

/**
 * Wraps camera / gallery selection with permission and cancellation handling.
 * Returns a persisted local URI, or null when nothing was chosen.
 */
export function useProfileImagePicker() {
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<PickerFeedback | null>(null);

  const ensurePermission = useCallback(async (source: Source) => {
    const label = source === "camera" ? "Camera" : "Photo library";
    const current =
      source === "camera"
        ? await ImagePicker.getCameraPermissionsAsync()
        : await ImagePicker.getMediaLibraryPermissionsAsync();
    if (current.granted) return true;

    const requested = current.canAskAgain
      ? source === "camera"
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync()
      : current;

    if (requested.granted) return true;

    setFeedback({
      tone: "warning",
      message: `${label} permission was denied. Your current photo was kept.`,
    });
    if (!requested.canAskAgain) showSettingsPrompt(label);
    return false;
  }, []);

  const pick = useCallback(
    async (source: Source): Promise<string | null> => {
      setFeedback(null);
      setBusy(true);
      try {
        if (!(await ensurePermission(source))) return null;

        const result =
          source === "camera"
            ? await ImagePicker.launchCameraAsync(pickerOptions)
            : await ImagePicker.launchImageLibraryAsync(pickerOptions);

        if (result.canceled || !result.assets?.[0]?.uri) {
          setFeedback({ tone: "info", message: "No photo selected. Nothing was changed." });
          return null;
        }

        const uri = await persistProfileImage(result.assets[0].uri);
        setFeedback({
          tone: "success",
          message: "New photo ready. Tap Save profile to keep it.",
        });
        return uri;
      } catch {
        setFeedback({
          tone: "error",
          message:
            source === "camera"
              ? "The camera could not be opened on this device. Try choosing from the gallery."
              : "The photo could not be loaded. Please try another image.",
        });
        return null;
      } finally {
        setBusy(false);
      }
    },
    [ensurePermission]
  );

  return {
    busy,
    feedback,
    setFeedback,
    takePhoto: () => pick("camera"),
    chooseFromLibrary: () => pick("library"),
  };
}
