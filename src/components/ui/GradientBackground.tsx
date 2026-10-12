import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../design-system/colors";

/** Full-screen pastel wash with two soft light blobs, shared by every screen */
export function GradientBackground() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={colors.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.blob, { top: -80, right: -60, backgroundColor: "rgba(255,255,255,0.35)" }]} />
      <View style={[styles.blob, { bottom: 80, left: -90, backgroundColor: "rgba(255,255,255,0.22)" }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  blob: { position: "absolute", width: 260, height: 260, borderRadius: 130 },
});
