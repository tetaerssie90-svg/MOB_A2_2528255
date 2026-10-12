import { Tabs } from "expo-router";
import { BottomTabDock } from "../../components/BottomTabDock";
import { tabs } from "../../design-system/nav";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}
      tabBar={(props) => <BottomTabDock {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: tabs.index.label }} />
      <Tabs.Screen name="skills" options={{ title: tabs.skills.label }} />
      <Tabs.Screen name="projects" options={{ title: tabs.projects.label }} />
      <Tabs.Screen name="profile" options={{ title: tabs.profile.label }} />
      <Tabs.Screen name="about" options={{ title: tabs.about.label }} />
    </Tabs>
  );
}
