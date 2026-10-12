import { useMemo } from "react";
import * as Haptics from "expo-haptics";

/** Light tactile feedback; failures (e.g. no vibration motor) are ignored */
export function useHaptics() {
  return useMemo(
    () => ({
      light: () => void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined),
      selection: () => void Haptics.selectionAsync().catch(() => undefined),
      success: () => void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined),
      error: () => void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => undefined),
    }),
    []
  );
}
