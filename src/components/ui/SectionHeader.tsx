import { Text, View } from "react-native";
import { colors } from "../../design-system/colors";

export function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <View className="gap-1">
      <Text accessibilityRole="header" className="font-body-bold text-lg" style={{ color: colors.text }}>
        {title}
      </Text>
      {description ? (
        <Text className="font-body text-sm" style={{ color: colors.textMuted }}>
          {description}
        </Text>
      ) : null}
    </View>
  );
}
