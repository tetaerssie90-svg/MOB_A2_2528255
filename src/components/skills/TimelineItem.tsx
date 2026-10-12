import { Text, View } from "react-native";
import { accentAt, colors } from "../../design-system/colors";
import type { TimelineEntry } from "../../types";
import { DottedLine } from "../ui/Dotted";

/** Place + period on top, title, then detail — joined by a dotted vertical rail */
export function TimelineItem({ entry, index, last }: { entry: TimelineEntry; index: number; last?: boolean }) {
  const accent = accentAt(index);
  return (
    <View
      className="flex-row gap-4"
      accessible
      accessibilityLabel={`${entry.period}. ${entry.title} at ${entry.place}. ${entry.detail}`}
    >
      <View className="items-center pt-1">
        <View className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: accent.bg }} />
        {last ? null : <DottedLine vertical style={{ marginTop: 4 }} />}
      </View>
      <View className={`flex-1 gap-1 ${last ? "" : "pb-7"}`}>
        <Text className="font-body-bold text-sm" style={{ color: colors.text }}>
          {entry.place}
        </Text>
        <Text className="font-body-medium text-xs" style={{ color: colors.textMuted }}>
          {entry.period}
        </Text>
        <Text className="mt-1.5 font-body-bold text-lg" style={{ color: colors.text }}>
          {entry.title}
        </Text>
        <Text className="font-body text-sm" style={{ color: colors.textMuted, lineHeight: 20 }}>
          {entry.detail}
        </Text>
      </View>
    </View>
  );
}
