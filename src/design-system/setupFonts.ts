import { Text, TextInput } from "react-native";
import { fontFamily } from "./typography";

/** Apply the body font to Text / TextInput after expo-font loads */
export function applyDefaultFont() {
  const style = { fontFamily };
  const TextWithDefaults = Text as typeof Text & {
    defaultProps?: { style?: unknown };
  };
  const TextInputWithDefaults = TextInput as typeof TextInput & {
    defaultProps?: { style?: unknown };
  };

  const textDefaults = TextWithDefaults.defaultProps ?? {};
  TextWithDefaults.defaultProps = {
    ...textDefaults,
    style: [textDefaults.style, style],
  };

  const inputDefaults = TextInputWithDefaults.defaultProps ?? {};
  TextInputWithDefaults.defaultProps = {
    ...inputDefaults,
    style: [inputDefaults.style, style],
  };
}
