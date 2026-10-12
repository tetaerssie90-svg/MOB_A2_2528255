import { Fragment, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { AcademicCapIcon, HandRaisedIcon, SparklesIcon } from "react-native-heroicons/outline";
import { SegmentedPills, type PillOption } from "../../components/ui/SegmentedPills";
import { EmptyState } from "../../components/ui/EmptyState";
import { DottedLine } from "../../components/ui/Dotted";
import { Chip } from "../../components/ui/Chip";
import { SkillCard } from "../../components/skills/SkillCard";
import { TimelineItem } from "../../components/skills/TimelineItem";
import { AvailabilityBadge } from "../../components/profile/AvailabilityBadge";
import { useProfile } from "../../context/ProfileContext";
import { colors, palette } from "../../design-system/colors";
import { TAB_DOCK_CLEARANCE } from "../../design-system/spacing";
import { education, skills } from "../../data/portfolio";
import { student } from "../../constants/student";

type Section = "hello" | "skills" | "academic";

const sections: PillOption<Section>[] = [
  { value: "hello", label: "Hello", icon: HandRaisedIcon },
  { value: "skills", label: "Skills", icon: SparklesIcon },
  { value: "academic", label: "Academic", icon: AcademicCapIcon },
];

function HelloSection() {
  const { profile } = useProfile();
  return (
    <View className="gap-4 py-2">
      <Text className="font-body-bold text-sm" style={{ color: colors.text }}>
        {student.institution}
      </Text>
      <Text className="font-body-bold text-xl" style={{ color: colors.text }}>
        {profile.headline}
      </Text>
      <Text className="font-body text-[15px]" style={{ color: colors.textMuted, lineHeight: 23 }}>
        {profile.bio}
      </Text>
      <DottedLine />
      <View className="flex-row flex-wrap items-center gap-2">
        <Chip label={profile.primarySkill} />
        <AvailabilityBadge value={profile.availability} />
      </View>
    </View>
  );
}

function SkillsSection() {
  if (skills.length === 0) {
    return <EmptyState title="No skills listed yet" message="Skills will appear here once they are added." />;
  }
  return (
    <View>
      {skills.map((skill, i) => (
        <Fragment key={skill.id}>
          {i > 0 ? <DottedLine /> : null}
          <SkillCard skill={skill} index={i} />
        </Fragment>
      ))}
    </View>
  );
}

function AcademicSection() {
  if (education.length === 0) {
    return <EmptyState title="No education entries yet" message="Education and training will appear here once they are added." />;
  }
  return (
    <View className="pt-3">
      {education.map((entry, i) => (
        <TimelineItem key={entry.id} entry={entry} index={i} last={i === education.length - 1} />
      ))}
    </View>
  );
}

export default function AboutMeScreen() {
  const insets = useSafeAreaInsets();
  const [section, setSection] = useState<Section>("hello");

  return (
    <View className="flex-1" style={{ backgroundColor: colors.surfaceSolid }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: TAB_DOCK_CLEARANCE + insets.bottom, flexGrow: 1 }}
      >
        <LinearGradient
          colors={[palette.teal[400], palette.teal[300]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingTop: insets.top + 22, paddingHorizontal: 24, paddingBottom: 54 }}
        >
          <Text accessibilityRole="header" className="font-title text-[30px]" style={{ color: colors.surfaceSolid }}>
            About me
          </Text>
          <Text className="mb-6 mt-1 font-body-medium text-sm" style={{ color: "rgba(255,255,255,0.92)" }}>
            {skills.length} skills · {education.length} learning milestones
          </Text>
          <SegmentedPills options={sections} value={section} onChange={setSection} />
        </LinearGradient>

        <View
          className="-mt-8 flex-1 rounded-t-[34px] px-6 pt-6"
          style={{ backgroundColor: "#F7FCFC" }}
        >
          <Animated.View key={section} entering={FadeInDown.duration(350)}>
            {section === "hello" ? <HelloSection /> : section === "skills" ? <SkillsSection /> : <AcademicSection />}
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
