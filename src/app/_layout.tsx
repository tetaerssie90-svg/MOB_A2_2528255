import "../../global.css";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";

import { WelcomeScreen } from "../components/WelcomeScreen";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { ProfileProvider, useProfile } from "../context/ProfileContext";
import { colors } from "../design-system/colors";
import { applyDefaultFont } from "../design-system/setupFonts";

SplashScreen.preventAutoHideAsync();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: "transparent",
    card: colors.surfaceSolid,
    text: colors.text,
    border: "transparent",
  },
};

function RootNavigation() {
  const { status } = useProfile();
  // Not persisted: the Welcome screen appears on every launch until Continue is tapped.
  const [showWelcome, setShowWelcome] = useState(true);
  const handleContinue = useCallback(() => setShowWelcome(false), []);

  // Keep the native splash up until the saved profile is restored, so the first frame is correct.
  useEffect(() => {
    if (status !== "loading") void SplashScreen.hideAsync();
  }, [status]);

  return (
    <ThemeProvider value={navigationTheme}>
      <View style={{ flex: 1, backgroundColor: colors.gradient[0] }}>
        <StatusBar style={showWelcome ? "light" : "dark"} />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "transparent" } }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
        {showWelcome && status !== "loading" ? <WelcomeScreen onContinue={handleContinue} /> : null}
      </View>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) applyDefaultFont();
  }, [fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <ProfileProvider>
            <RootNavigation />
          </ProfileProvider>
        </ErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
