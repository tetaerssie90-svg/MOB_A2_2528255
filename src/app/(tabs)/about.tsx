import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Screen, ScreenScroll, TabScreenHeader } from "../../components/ui/Screen";
import { Card } from "../../components/ui/Card";
import { InfoRow } from "../../components/ui/InfoRow";
import { LinkRow } from "../../components/ui/LinkRow";
import { Notice } from "../../components/ui/Notice";
import { DottedLine } from "../../components/ui/Dotted";
import { VerificationCode } from "../../components/profile/VerificationCode";
import { colors } from "../../design-system/colors";
import { appVersion, dataUseStatement } from "../../constants/app";
import { student, verificationCode } from "../../constants/student";

const enter = (i: number) => FadeInDown.delay(60 + i * 90).duration(400);

export default function AboutScreen() {
  return (
    <Screen>
      <TabScreenHeader title="App info" subtitle="Release and data details" />
      <ScreenScroll>
        <Animated.View entering={enter(0)}>
          <Card className="gap-4">
            <View className="items-center gap-3 pb-1 pt-2">
              <Text accessibilityRole="header" className="font-title text-[26px]" style={{ color: colors.text }}>
                {student.appName}
              </Text>
              <VerificationCode centered />
            </View>
            <DottedLine />
            <View>
              <InfoRow label="Student" value={student.fullName} />
              <InfoRow label="Registration number" value={student.registrationNumber} />
              <InfoRow label="Verification code" value={verificationCode} />
              <InfoRow label="Version" value={appVersion} />
              <InfoRow label="Course" value="SWE 3409 · Mobile Application Development" />
              <InfoRow label="Institution" value={student.institution} />
              <InfoRow label="Location" value={student.location} last />
            </View>
          </Card>
        </Animated.View>

        <Animated.View entering={enter(1)}>
          <Card className="gap-2">
            <Text className="font-body-bold text-lg" style={{ color: colors.text }}>
              How your data is used
            </Text>
            <Text className="font-body text-sm" style={{ color: colors.textSecondary, lineHeight: 21 }}>
              {dataUseStatement}
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={enter(2)}>
          <Notice tone="success" message="Everything works in Airplane Mode. Only the links below need internet." />
        </Animated.View>

        <Animated.View entering={enter(3)}>
          <Card className="py-2">
            <LinkRow label="GitHub" value={student.githubUrl.replace(/^https?:\/\//, "")} url={student.githubUrl} />
            <DottedLine />
            <LinkRow label="LinkedIn" value={student.linkedinUrl.replace(/^https?:\/\/(www\.)?/, "")} url={student.linkedinUrl} />
          </Card>
        </Animated.View>

        <Text className="text-center font-body-medium text-xs" style={{ color: colors.textSecondary }}>
          Built with React Native, Expo and TypeScript
        </Text>
      </ScreenScroll>
    </Screen>
  );
}
