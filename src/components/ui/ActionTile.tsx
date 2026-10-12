import { Text, View } from "react-native";
import type { Accent } from "../../design-system/colors";
import { colors } from "../../design-system/colors";
import type { HeroIcon } from "../../design-system/nav";
import { PressableScale } from "./PressableScale";

/** Coloured square shortcut ("know my work", "about me", "where I am") */
export function ActionTile({
  title,
  icon: Icon,
  accent,
  onPress,
  hint,
}: {
  title: string;
  icon: HeroIcon;
  accent: Accent;
  onPress: () => void;
  hint?: string;
}) {
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={title.replace("\n", " ")}
      accessibilityHint={hint}
      onPress={onPress}
      style={{ flex: 1, minHeight: 112, borderRadius: 22, padding: 14, backgroundColor: accent.bg, justifyContent: "space-between" }}
    >
      <View className="h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.45)" }}>
        <Icon size={20} color={colors.text} strokeWidth={1.6} />
      </View>
      <Text className="mt-3 font-body-bold text-[13px]" style={{ color: colors.text, lineHeight: 17 }}>
        {title}
      </Text>
    </PressableScale>
  );
}
