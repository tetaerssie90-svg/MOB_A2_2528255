import type { ReactNode } from "react";
import { Text, View } from "react-native";
import { colors } from "../../design-system/colors";
import { DottedBorder } from "./Dotted";

export function EmptyState({ title, message, action }: { title: string; message: string; action?: ReactNode }) {
  return (
    <DottedBorder radius={28} color={colors.dotsStrong} style={{ backgroundColor: colors.surfaceSoft }}>
      <View className="items-center gap-2 px-6 py-10">
        <Text className="text-center font-body-bold text-base" style={{ color: colors.text }}>
          {title}
        </Text>
        <Text className="text-center font-body text-sm" style={{ color: colors.textSecondary }}>
          {message}
        </Text>
        {action}
      </View>
    </DottedBorder>
  );
}
