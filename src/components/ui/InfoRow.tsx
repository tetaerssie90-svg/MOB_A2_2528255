import { Text, View } from "react-native";
import { colors } from "../../design-system/colors";
import { DottedLine } from "./Dotted";

/** Label / value pair that wraps instead of truncating at large text sizes */
export function InfoRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View>
      <View
        className="flex-row flex-wrap justify-between gap-x-4 gap-y-1 py-3"
        accessible
        accessibilityLabel={`${label}: ${value}`}
      >
        <Text className="font-body text-sm" style={{ color: colors.textMuted }}>
          {label}
        </Text>
        <Text className="flex-shrink font-body-bold text-sm" style={{ color: colors.text, textAlign: "right" }}>
          {value}
        </Text>
      </View>
      {last ? null : <DottedLine />}
    </View>
  );
}
