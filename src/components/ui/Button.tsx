import { ActivityIndicator, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../design-system/colors";
import { MIN_TOUCH } from "../../design-system/spacing";
import type { HeroIcon } from "../../design-system/nav";
import { PressableScale } from "./PressableScale";

type Variant = "primary" | "outline" | "danger" | "ghost";

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  icon?: HeroIcon;
  disabled?: boolean;
  loading?: boolean;
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
};

const variants: Record<Exclude<Variant, "primary">, { fg: string; bg: string; border: string }> = {
  outline: { fg: colors.accentText, bg: colors.surfaceSolid, border: colors.primarySoft },
  danger: { fg: colors.error, bg: colors.errorSoft, border: colors.errorSoft },
  ghost: { fg: colors.textSecondary, bg: "transparent", border: "transparent" },
};

export function Button({ label, onPress, variant = "primary", icon: Icon, disabled, loading, accessibilityHint, style }: Props) {
  const inactive = disabled || loading;
  const color = variant === "primary" ? colors.onPrimary : variants[variant].fg;

  const content = (
    <View className="flex-row flex-wrap items-center justify-center gap-2 px-5 py-3" style={{ minHeight: MIN_TOUCH }}>
      {loading ? <ActivityIndicator color={color} /> : Icon ? <Icon size={18} color={color} strokeWidth={1.8} /> : null}
      <Text className="font-body-bold text-[15px]" style={{ color }}>
        {label}
      </Text>
    </View>
  );

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: inactive, busy: loading }}
      disabled={inactive}
      onPress={onPress}
      style={[{ opacity: inactive ? 0.5 : 1, borderRadius: 999 }, style]}
    >
      {variant === "primary" ? (
        <LinearGradient colors={colors.primaryGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 999 }}>
          {content}
        </LinearGradient>
      ) : (
        <View
          style={{
            borderRadius: 999,
            borderWidth: 1.5,
            borderColor: variants[variant].border,
            backgroundColor: variants[variant].bg,
          }}
        >
          {content}
        </View>
      )}
    </PressableScale>
  );
}
