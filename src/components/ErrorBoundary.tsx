import { Component, type ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { colors } from "../design-system/colors";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <View className="flex-1 items-center justify-center px-8" style={{ backgroundColor: colors.gradient[1] }}>
        <Text className="mb-2 text-center font-body-bold text-xl" style={{ color: colors.text }}>
          Something went wrong
        </Text>
        <Text className="mb-6 text-center font-body text-base" style={{ color: colors.textSecondary }}>
          Your saved profile is safe on this device. Try again to reload the screen.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => this.setState({ hasError: false })}
          className="rounded-full px-6 py-3"
          style={{ backgroundColor: colors.primary }}
        >
          <Text className="font-body-bold text-base" style={{ color: colors.onPrimary }}>
            Try again
          </Text>
        </Pressable>
      </View>
    );
  }
}
