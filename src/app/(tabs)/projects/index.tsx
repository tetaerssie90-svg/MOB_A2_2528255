import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Screen, ScreenScroll, TabScreenHeader } from "../../../components/ui/Screen";
import { EmptyState } from "../../../components/ui/EmptyState";
import { ProjectCard } from "../../../components/projects/ProjectCard";
import { projects } from "../../../data/portfolio";

export default function ProjectsScreen() {
  return (
    <Screen>
      <TabScreenHeader title="My work" subtitle="Tap a project to see what I built" />
      <ScreenScroll>
        {projects.length === 0 ? (
          <EmptyState title="No projects yet" message="Projects will appear here once they are added." />
        ) : (
          <View className="gap-5">
            {projects.map((project, i) => (
              <Animated.View key={project.id} entering={FadeInDown.delay(80 + i * 100).duration(450)}>
                <ProjectCard project={project} index={i} />
              </Animated.View>
            ))}
          </View>
        )}
      </ScreenScroll>
    </Screen>
  );
}
