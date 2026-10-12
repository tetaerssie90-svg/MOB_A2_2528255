import { Text, View } from "react-native";
import { accentAt, colors } from "../../design-system/colors";
import type { Skill, SkillLevel } from "../../types";

const levelSteps: Record<SkillLevel, number> = { Beginner: 1, Intermediate: 2, Advanced: 3 };

/** Skill entry styled like the experience list in the reference — no icon, dotted dividers come from the parent */
export function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const accent = accentAt(index);
  const steps = levelSteps[skill.level];

  return (
    <View className="gap-1.5 py-4" accessible accessibilityLabel={`${skill.name}, ${skill.level}. ${skill.evidence}`}>
      <View className="flex-row flex-wrap items-center justify-between gap-2">
        <Text className="font-body-bold text-xs" style={{ color: accent.text }}>
          {skill.level}
        </Text>
        <View className="flex-row gap-1">
          {[1, 2, 3].map((n) => (
            <View
              key={n}
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: n <= steps ? accent.bg : "rgba(169,174,203,0.35)" }}
            />
          ))}
        </View>
      </View>
      <Text className="font-body-bold text-lg" style={{ color: colors.text }}>
        {skill.name}
      </Text>
      <Text className="font-body text-sm" style={{ color: colors.textMuted, lineHeight: 20 }}>
        {skill.evidence}
      </Text>
    </View>
  );
}
