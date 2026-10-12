import { useState } from "react";
import { Text, TextInput, View, type TextInputProps } from "react-native";
import { colors } from "../../design-system/colors";
import { MIN_TOUCH } from "../../design-system/spacing";
import { DottedBorder } from "./Dotted";

type Props = Omit<TextInputProps, "onChangeText" | "value"> & {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  hint?: string;
  maxLength?: number;
};

export function FormField({ label, value, onChangeText, error, hint, maxLength, multiline, onFocus, onBlur, ...rest }: Props) {
  const [focused, setFocused] = useState(false);
  const dotColor = error ? colors.error : focused ? colors.primary : colors.dots;

  return (
    <View className="gap-2">
      <View className="flex-row flex-wrap items-end justify-between gap-2">
        <Text className="font-body-bold text-sm" style={{ color: colors.text }}>
          {label}
        </Text>
        {maxLength ? (
          <Text
            className="font-body-medium text-xs"
            style={{ color: value.length > maxLength ? colors.error : colors.textMuted }}
            accessibilityLabel={`${value.length} of ${maxLength} characters used`}
          >
            {value.length}/{maxLength}
          </Text>
        ) : null}
      </View>
      <DottedBorder radius={18} color={dotColor} style={{ backgroundColor: colors.surfaceSolid }}>
        <TextInput
          accessibilityLabel={label}
          accessibilityHint={hint}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          placeholderTextColor={colors.textMuted}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className="px-4 py-3 font-body text-base"
          style={{
            minHeight: multiline ? 120 : MIN_TOUCH,
            textAlignVertical: multiline ? "top" : "center",
            color: colors.text,
          }}
          {...rest}
        />
      </DottedBorder>
      {error ? (
        <Text accessibilityLiveRegion="polite" className="font-body-semibold text-[13px]" style={{ color: colors.error }}>
          {error}
        </Text>
      ) : hint ? (
        <Text className="font-body text-xs" style={{ color: colors.textMuted }}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
}
