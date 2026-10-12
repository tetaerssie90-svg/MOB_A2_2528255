import { Text, View } from "react-native";
import { router } from "expo-router";
import { ArrowUpRightIcon } from "react-native-heroicons/outline";
import { accentAt, colors } from "../../design-system/colors";
import { cardShadow } from "../../design-system/shadows";
import type { Project } from "../../types";
import { Chip } from "../ui/Chip";
import { DottedLine } from "../ui/Dotted";
import { PressableScale } from "../ui/PressableScale";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const accent = accentAt(index);

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={`Project ${index + 1}: ${project.title}. ${project.summary}`}
      accessibilityHint="Opens the project details"
      onPress={() => router.push({ pathname: "/projects/[id]", params: { id: project.id } })}
      style={[
        cardShadow,
        { borderRadius: 28, overflow: "hidden", backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.surfaceBorder },
      ]}
    >
      <View className="flex-row items-center justify-between px-5 pb-4 pt-5" style={{ backgroundColor: accent.soft }}>
        <Text className="font-title text-4xl" style={{ color: accent.bg, letterSpacing: -1 }}>
          {String(index + 1).padStart(2, "0")}
        </Text>
        <View className="h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: colors.surfaceSolid }}>
          <ArrowUpRightIcon size={20} color={accent.text} strokeWidth={2} />
        </View>
      </View>
      <View className="gap-3 p-5">
        <Text className="font-body-bold text-xl" style={{ color: colors.text }}>
          {project.title}
        </Text>
        <Text className="font-body text-sm" style={{ color: colors.textMuted, lineHeight: 20 }}>
          {project.summary}
        </Text>
        <DottedLine />
        <View className="flex-row flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <Chip key={`${tech}-${i}`} label={tech} color={accent.text} background={accent.soft} />
          ))}
        </View>
      </View>
    </PressableScale>
  );
}
