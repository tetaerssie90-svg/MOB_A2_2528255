import { Text, View } from "react-native";
import { colors } from "../../design-system/colors";

type Tone = "info" | "success" | "warning" | "error";

const tones: Record<Tone, { fg: string; bg: string }> = {
  info: { fg: colors.textSecondary, bg: "rgba(255,255,255,0.7)" },
  success: { fg: colors.success, bg: colors.successSoft },
  warning: { fg: colors.warning, bg: colors.warningSoft },
  error: { fg: colors.error, bg: colors.errorSoft },
};

/** Inline status message — save results, picker feedback and offline hints */
export function Notice({ tone = "info", message }: { tone?: Tone; message: string }) {
  const t = tones[tone];
  return (
    <View
      accessibilityLiveRegion="polite"
      className="flex-row items-center gap-3 rounded-2xl px-4 py-3"
      style={{ backgroundColor: t.bg }}
    >
      <View className="h-2 w-2 rounded-full" style={{ backgroundColor: t.fg }} />
      <Text className="flex-1 font-body-medium text-[13px]" style={{ color: t.fg }}>
        {message}
      </Text>
    </View>
  );
}
