import { View } from "react-native";
import { router } from "expo-router";
import { Screen, StackScreenHeader } from "../components/ui/Screen";
import { EmptyState } from "../components/ui/EmptyState";
import { Button } from "../components/ui/Button";

export default function NotFoundScreen() {
  return (
    <Screen>
      <StackScreenHeader title="Page not found" />
      <View className="p-5">
        <EmptyState
          title="This page doesn't exist"
          message="The link you followed may be broken."
          action={<Button label="Go to Home" onPress={() => router.replace("/")} style={{ marginTop: 8 }} />}
        />
      </View>
    </Screen>
  );
}
