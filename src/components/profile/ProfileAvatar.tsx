import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { palette } from "../../design-system/colors";
import { student } from "../../constants/student";
import { avatarIllustration } from "../../constants/images";
import { DottedBorder } from "../ui/Dotted";

/** Photo, or the illustrated avatar on a pastel disc, inside a dotted halo ring */
export function ProfileAvatar({ uri, size = 150 }: { uri: string | null; size?: number }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [uri]);

  const showPhoto = Boolean(uri) && !failed;
  const ring = size + 22;

  return (
    <DottedBorder
      radius={ring / 2}
      color="rgba(124,77,219,0.55)"
      strokeWidth={2.5}
      gap={8}
      style={{ width: ring, height: ring, alignItems: "center", justifyContent: "center" }}
    >
      <View
        accessible
        accessibilityRole="image"
        accessibilityLabel={showPhoto ? `Profile photo of ${student.fullName}` : `Illustrated avatar of ${student.fullName}`}
        style={{ width: size, height: size, borderRadius: size / 2, overflow: "hidden" }}
      >
        {showPhoto ? (
          <Image source={{ uri: uri! }} onError={() => setFailed(true)} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
        ) : (
          <LinearGradient
            colors={[palette.pink[300], palette.lavender[200], palette.teal[300]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
          >
            <Image source={avatarIllustration} style={{ width: size * 0.98, height: size * 0.98 }} resizeMode="contain" />
          </LinearGradient>
        )}
      </View>
    </DottedBorder>
  );
}
