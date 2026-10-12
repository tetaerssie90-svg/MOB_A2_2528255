import type { ReactNode } from "react";
import { ScrollView, Text, View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { colors } from "../../design-system/colors";
import { TAB_DOCK_CLEARANCE } from "../../design-system/spacing";
import { GradientBackground } from "./GradientBackground";
import { PressableScale } from "./PressableScale";

export function Screen({ className, children, ...rest }: ViewProps & { className?: string }) {
  return (
    <View className={`flex-1 font-sans ${className ?? ""}`} {...rest}>
      <GradientBackground />
      {children}
    </View>
  );
}

/** Large left-aligned title sitting directly on the gradient (no bar, no icon) */
export function TabScreenHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-row items-end gap-3 px-6 pb-2" style={{ paddingTop: insets.top + 18 }}>
      <View className="flex-1">
        <Text accessibilityRole="header" className="font-title text-[30px]" style={{ color: colors.text, lineHeight: 38 }}>
          {title}
        </Text>
        {subtitle ? (
          <Text className="mt-1 font-body-medium text-sm" style={{ color: colors.textSecondary }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right}
    </View>
  );
}

export function BackButton({ fallback = "/projects", tint = colors.text }: { fallback?: "/projects" | "/"; tint?: string }) {
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel="Go back"
      hitSlop={10}
      onPress={() => (router.canGoBack() ? router.back() : router.replace(fallback))}
      style={{
        height: 44,
        width: 44,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.6)",
      }}
    >
      <ArrowLeftIcon size={22} color={tint} strokeWidth={2} />
    </PressableScale>
  );
}

/** Stack screen header: back button + optional title on the gradient */
export function StackScreenHeader({ title }: { title?: string }) {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-row items-center gap-3 px-4 pb-2" style={{ paddingTop: insets.top + 8 }}>
      <BackButton />
      {title ? (
        <Text accessibilityRole="header" className="flex-1 font-body-bold text-lg" style={{ color: colors.text }}>
          {title}
        </Text>
      ) : null}
    </View>
  );
}

/** Scrollable body that leaves room for the floating tab dock */
export function ScreenScroll({
  children,
  withDock = true,
  padded = true,
}: {
  children: ReactNode;
  withDock?: boolean;
  padded?: boolean;
}) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: padded ? 18 : 0,
        paddingTop: 14,
        paddingBottom: (withDock ? TAB_DOCK_CLEARANCE : 28) + insets.bottom,
        gap: 16,
      }}
    >
      {children}
    </ScrollView>
  );
}
