import { ScrollView, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { BackButton, Screen, ScreenScroll, StackScreenHeader } from "../../../components/ui/Screen";
import { Chip } from "../../../components/ui/Chip";
import { Button } from "../../../components/ui/Button";
import { EmptyState } from "../../../components/ui/EmptyState";
import { LinkRow } from "../../../components/ui/LinkRow";
import { DottedLine } from "../../../components/ui/Dotted";
import { accentAt, colors } from "../../../design-system/colors";
import { TAB_DOCK_CLEARANCE } from "../../../design-system/spacing";
import { projects } from "../../../data/portfolio";

function Section({ title, children, index }: { title: string; children: React.ReactNode; index: number }) {
  return (
    <Animated.View entering={FadeInDown.delay(120 + index * 80).duration(400)} className="gap-3">
      <Text accessibilityRole="header" className="font-body-bold text-xs uppercase" style={{ color: colors.textMuted, letterSpacing: 1.2 }}>
        {title}
      </Text>
      {children}
    </Animated.View>
  );
}

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const index = projects.findIndex((p) => p.id === id);
  const project = projects[index];

  if (!project) {
    return (
      <Screen>
        <StackScreenHeader title="Project not found" />
        <ScreenScroll>
          <EmptyState
            title="We couldn't find that project"
            message="It may have been removed from the portfolio."
            action={<Button label="Back to projects" variant="outline" onPress={() => router.back()} style={{ marginTop: 8 }} />}
          />
        </ScreenScroll>
      </Screen>
    );
  }

  const accent = accentAt(index);

  return (
    <View className="flex-1" style={{ backgroundColor: colors.surfaceSolid }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: TAB_DOCK_CLEARANCE + insets.bottom, flexGrow: 1 }}
      >
        <LinearGradient
          colors={[accent.bg, accent.soft]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.6, y: 1 }}
          style={{ paddingTop: insets.top + 10, paddingHorizontal: 20, paddingBottom: 56 }}
        >
          <BackButton />
          <Text className="mt-6 font-title text-5xl" style={{ color: "rgba(255,255,255,0.85)", letterSpacing: -1 }}>
            {String(index + 1).padStart(2, "0")}
          </Text>
          <Text accessibilityRole="header" className="mt-1 font-title text-[26px]" style={{ color: colors.text, lineHeight: 32 }}>
            {project.title}
          </Text>
          <Text className="mt-2 font-body-medium text-[15px]" style={{ color: colors.textSecondary, lineHeight: 22 }}>
            {project.summary}
          </Text>
        </LinearGradient>

        <View className="-mt-8 flex-1 gap-6 rounded-t-[34px] px-6 pt-7" style={{ backgroundColor: "#FBFAFF" }}>
          <Section title="The problem" index={0}>
            <Text className="font-body text-[15px]" style={{ color: colors.textSecondary, lineHeight: 24 }}>
              {project.problem}
            </Text>
          </Section>
          <DottedLine />

          <Section title="My contribution" index={1}>
            <View className="gap-3">
              {project.contribution.map((item, i) => (
                <View key={i} className="flex-row gap-3">
                  <View className="mt-2 h-2 w-2 rounded-full" style={{ backgroundColor: accent.bg }} />
                  <Text className="flex-1 font-body text-[15px]" style={{ color: colors.textSecondary, lineHeight: 22 }}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </Section>
          <DottedLine />

          <Section title="Technology used" index={2}>
            <View className="flex-row flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <Chip key={`${tech}-${i}`} label={tech} color={accent.text} background={accent.soft} />
              ))}
            </View>
          </Section>
          <DottedLine />

          <Section title="Outcome" index={3}>
            <Text className="font-body-semibold text-[15px]" style={{ color: colors.text, lineHeight: 23 }}>
              {project.outcome}
            </Text>
          </Section>

          {project.link ? (
            <>
              <DottedLine />
              <LinkRow label="Source code" value={project.link.replace(/^https?:\/\//, "")} url={project.link} />
            </>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
