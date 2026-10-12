import { memo } from "react";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../design-system/colors";
import { tabs, type TabKey } from "../design-system/nav";
import { fontFamilyBold } from "../design-system/typography";
import { PressableScale } from "./ui/PressableScale";

/** Floating frosted dock — icon only, label appears on the active tab */
export const BottomTabDock = memo(function BottomTabDock({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View pointerEvents="box-none" style={[styles.wrapper, { bottom: Math.max(insets.bottom, 10) + 6 }]}>
      <View style={styles.dock} accessibilityRole="tablist">
        {state.routes.map((route, idx) => {
          const tab = tabs[route.name as TabKey];
          if (!tab) return null;
          const isFocused = state.index === idx;
          const label = tab.label ?? descriptors[route.key].options.title ?? route.name;
          const Icon = isFocused ? tab.activeIcon : tab.icon;

          const onPress = () => {
            const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name as never);
            }
          };

          return (
            <PressableScale
              key={route.key}
              onPress={onPress}
              accessibilityRole="tab"
              accessibilityState={{ selected: isFocused }}
              accessibilityLabel={label}
              style={[styles.item, isFocused && styles.itemActive]}
            >
              <Icon size={22} color={isFocused ? colors.onPrimary : colors.textMuted} />
              {isFocused ? (
                <Text numberOfLines={1} maxFontSizeMultiplier={1.2} style={styles.label}>
                  {label}
                </Text>
              ) : null}
            </PressableScale>
          );
        })}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: { position: "absolute", left: 14, right: 14, alignItems: "center", zIndex: 50 },
  dock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 440,
    padding: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: "rgba(255,255,255,0.92)",
    shadowColor: "#6B5FB5",
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 48,
    minWidth: 48,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  itemActive: { backgroundColor: colors.primary, paddingHorizontal: 16 },
  label: { fontFamily: fontFamilyBold, fontSize: 13, color: colors.onPrimary },
});
