import { Text, View } from "react-native";
import type { Availability } from "../../types";
import { availabilityMeta } from "../../utils/availability";

export function AvailabilityBadge({ value, centered }: { value: Availability; centered?: boolean }) {
  const meta = availabilityMeta(value);
  return (
    <View
      accessible
      accessibilityLabel={`Availability: ${meta.label}`}
      className={`flex-row items-center gap-2 rounded-full px-3.5 py-1.5 ${centered ? "self-center" : "self-start"}`}
      style={{ backgroundColor: meta.background }}
    >
      <View className="h-2 w-2 rounded-full" style={{ backgroundColor: meta.color }} />
      <Text className="font-body-bold text-xs" style={{ color: meta.color }}>
        {meta.label}
      </Text>
    </View>
  );
}
