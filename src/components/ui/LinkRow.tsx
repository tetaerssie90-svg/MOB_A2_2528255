import { Alert, Linking, Text, View } from "react-native";
import { ArrowUpRightIcon } from "react-native-heroicons/outline";
import { colors } from "../../design-system/colors";
import { MIN_TOUCH } from "../../design-system/spacing";
import { PressableScale } from "./PressableScale";

/** External link, clearly labelled as needing an internet connection */
export function LinkRow({ label, value, url }: { label: string; value: string; url: string }) {
  const open = async () => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert("Can't open link", "This link needs an internet connection and a browser or mail app.");
    }
  };

  return (
    <PressableScale
      accessibilityRole="link"
      accessibilityLabel={`${label}, ${value}. Needs internet connection.`}
      onPress={() => void open()}
      style={{ minHeight: MIN_TOUCH, flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12 }}
    >
      <View className="flex-1 gap-0.5">
        <Text className="font-body-medium text-xs" style={{ color: colors.textMuted }}>
          {label} · needs internet
        </Text>
        <Text className="font-body-bold text-[15px]" style={{ color: colors.text }}>
          {value}
        </Text>
      </View>
      <ArrowUpRightIcon size={18} color={colors.accentText} strokeWidth={2} />
    </PressableScale>
  );
}
