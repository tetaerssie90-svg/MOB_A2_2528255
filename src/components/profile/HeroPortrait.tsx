import { Image, View, useWindowDimensions } from "react-native";
import { student } from "../../constants/student";
import { avatarIllustration } from "../../constants/images";
import { ProfileAvatar } from "./ProfileAvatar";

/**
 * Home hero: the cut-out illustration stands directly on the gradient (as in the reference design).
 * Once the user picks a real photo, the circular photo avatar is shown instead.
 */
export function HeroPortrait({ uri }: { uri: string | null }) {
  const { width } = useWindowDimensions();

  if (uri) {
    return <ProfileAvatar uri={uri} />;
  }

  const size = Math.min(width * 0.68, 300);

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={`Illustrated avatar of ${student.fullName}`}
      style={{ width: size, height: size, alignItems: "center", justifyContent: "flex-end" }}
    >
      <View
        style={{
          position: "absolute",
          bottom: size * 0.04,
          width: size * 0.82,
          height: size * 0.82,
          borderRadius: size,
          backgroundColor: "rgba(255,255,255,0.35)",
        }}
      />
      <Image source={avatarIllustration} style={{ width: size, height: size }} resizeMode="contain" />
    </View>
  );
}
