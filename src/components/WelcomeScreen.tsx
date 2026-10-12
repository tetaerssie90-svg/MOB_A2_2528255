import { useCallback, useEffect } from "react";
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { palette } from "../design-system/colors";
import { fontFamilyBold, titleFontFamily } from "../design-system/typography";
import { student } from "../constants/student";
import { avatarIllustration } from "../constants/images";
import { useHaptics } from "../hooks/useHaptics";

/** Shown on every app launch; stays until the user taps Continue */
export function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();

  const opacity = useSharedValue(1);
  const slide = useSharedValue(40);
  const peek = useSharedValue(80);
  const button = useSharedValue(0);

  useEffect(() => {
    slide.value = withTiming(0, { duration: 700, easing: Easing.out(Easing.cubic) });
    peek.value = withDelay(150, withTiming(0, { duration: 800, easing: Easing.out(Easing.back(1.2)) }));
    button.value = withDelay(600, withTiming(1, { duration: 450 }));
  }, [slide, peek, button]);

  const handleContinue = useCallback(() => {
    haptics.light();
    opacity.value = withTiming(0, { duration: 350 }, (finished) => {
      if (finished) runOnJS(onContinue)();
    });
  }, [haptics, onContinue, opacity]);

  const fade = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const rise = useAnimatedStyle(() => ({ transform: [{ translateY: slide.value }] }));
  const slideIn = useAnimatedStyle(() => ({ transform: [{ translateX: peek.value }] }));
  const buttonIn = useAnimatedStyle(() => ({
    opacity: button.value,
    transform: [{ translateY: (1 - button.value) * 16 }],
  }));

  const buttonBottom = insets.bottom + 28;
  const BUTTON_HEIGHT = 56;
  // Character stands just above the Continue button rather than behind it.
  const portraitBottom = buttonBottom + BUTTON_HEIGHT + 12;
  const portrait = Math.min(height * 0.56, width * 1.3);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, { zIndex: 100 }, fade]} accessibilityViewIsModal>
      <LinearGradient
        colors={[palette.lavender[400], palette.lavender[500], palette.periwinkle[400]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.Image
        source={avatarIllustration}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
        style={[
          { position: "absolute", bottom: portraitBottom, right: -portrait * 0.3, width: portrait, height: portrait },
          slideIn,
        ]}
      />
      <Animated.View style={[styles.wordWrap, { height }, rise]} importantForAccessibility="no-hide-descendants">
        <Text allowFontScaling={false} numberOfLines={1} style={[styles.word, { width: height * 0.9 }]}>
          Welcome
        </Text>
      </Animated.View>

      <View style={[styles.top, { top: insets.top + 24 }]}>
        <Text accessibilityRole="header" style={styles.app}>
          {student.appName}
        </Text>
        <Text style={styles.tagline}>Welcome to my portfolio</Text>
      </View>

      <Animated.View style={[styles.footer, { bottom: buttonBottom }, buttonIn]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Continue"
          accessibilityHint="Opens the portfolio"
          onPress={handleContinue}
          android_ripple={{ color: "rgba(124,77,219,0.15)", borderless: false }}
          style={styles.button}
        >
          <Text maxFontSizeMultiplier={1.4} style={styles.buttonLabel}>Continue</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wordWrap: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  word: {
    transform: [{ rotate: "-90deg" }],
    fontFamily: titleFontFamily,
    fontSize: 118,
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: -3,
  },
  top: { position: "absolute", right: 28, alignItems: "flex-end" },
  app: { fontFamily: titleFontFamily, fontSize: 22, color: "#FFFFFF" },
  tagline: { marginTop: 2, fontFamily: fontFamilyBold, fontSize: 13, color: "rgba(255,255,255,0.88)" },
  footer: { position: "absolute", left: 24, right: 24 },
  button: {
    height: 56,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3B1F86",
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  buttonLabel: { fontFamily: fontFamilyBold, fontSize: 17, color: palette.lavender[700] },
});
