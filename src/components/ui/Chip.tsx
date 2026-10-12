import { Text, View } from "react-native";
import { colors } from "../../design-system/colors";

export function Chip({ label, color = colors.accentText, background = colors.primarySoft }: {
  label: string;
  color?: string;
  background?: string;
}) {
  return (
    <View className="rounded-full px-3 py-1.5" style={{ backgroundColor: background }}>
      <Text className="font-body-semibold text-xs" style={{ color }}>
        {label}
      </Text>
    </View>
  );
}
