import type { ReactNode } from "react";
import { View, type ViewProps } from "react-native";
import { colors } from "../../design-system/colors";
import { cardShadow } from "../../design-system/shadows";

/** Frosted white card floating on the gradient */
export function Card({ children, className, style, ...rest }: ViewProps & { className?: string; children: ReactNode }) {
  return (
    <View
      className={`rounded-[28px] p-5 ${className ?? ""}`}
      style={[cardShadow, { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.surfaceBorder }, style]}
      {...rest}
    >
      {children}
    </View>
  );
}
