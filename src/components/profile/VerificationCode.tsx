import { Text, View } from "react-native";
import { colors } from "../../design-system/colors";
import { verificationCode } from "../../constants/student";
import { DottedBorder } from "../ui/Dotted";

/** Ticket-style verification code with a dotted outline */
export function VerificationCode({ centered }: { centered?: boolean }) {
  return (
    <DottedBorder
      radius={14}
      color={colors.dotsStrong}
      style={{ alignSelf: centered ? "center" : "flex-start", backgroundColor: colors.primarySoft }}
    >
      <View
        accessible
        accessibilityLabel={`Verification code ${verificationCode.split("").join(" ")}`}
        className="flex-row flex-wrap items-center gap-2 px-3.5 py-2"
      >
        <Text className="font-body-medium text-xs" style={{ color: colors.textSecondary }}>
          Verification
        </Text>
        <Text className="font-body-bold text-sm" style={{ color: colors.accentText, letterSpacing: 1.2 }}>
          {verificationCode}
        </Text>
      </View>
    </DottedBorder>
  );
}
