import { Text, View } from "react-native";
import { colors } from "../../design-system/colors";
import type { HeroIcon } from "../../design-system/nav";
import { PressableScale } from "./PressableScale";

export type PillOption<T extends string> = { value: T; label: string; icon: HeroIcon };

/** Icon-in-a-rounded-square tabs, as in the "About me" header of the reference design */
export function SegmentedPills<T extends string>({
  options,
  value,
  onChange,
}: {
  options: PillOption<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <View className="flex-row gap-6" accessibilityRole="tablist">
      {options.map(({ value: v, label, icon: Icon }) => {
        const active = v === value;
        return (
          <PressableScale
            key={v}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={label}
            onPress={() => onChange(v)}
            style={{ alignItems: "center", gap: 6, minWidth: 64 }}
          >
            <View
              className="h-14 w-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: active ? colors.surfaceSolid : "rgba(255,255,255,0.35)" }}
            >
              <Icon size={24} color={active ? colors.primary : colors.surfaceSolid} strokeWidth={1.6} />
            </View>
            <Text
              className={active ? "font-body-bold text-xs" : "font-body-medium text-xs"}
              style={{ color: active ? colors.text : "rgba(35,40,66,0.7)" }}
            >
              {label}
            </Text>
          </PressableScale>
        );
      })}
    </View>
  );
}
