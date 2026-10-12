import { useState, type ReactNode } from "react";
import { View, type LayoutChangeEvent, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Line, Rect } from "react-native-svg";
import { colors } from "../../design-system/colors";

/** Round caps on near-zero dashes draw true dots (RN's borderStyle="dotted" is unreliable on Android) */
const DOT = "0.1";

type BorderProps = {
  children?: ReactNode;
  radius?: number;
  color?: string;
  strokeWidth?: number;
  gap?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

/** Rounded container with a dotted outline */
export function DottedBorder({
  children,
  radius = 20,
  color = colors.dots,
  strokeWidth = 2,
  gap = 6,
  className,
  style,
}: BorderProps) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width !== size.w || height !== size.h) setSize({ w: width, h: height });
  };
  const inset = strokeWidth / 2;

  return (
    <View onLayout={onLayout} className={className} style={[{ borderRadius: radius }, style]}>
      {size.w > 0 ? (
        <Svg pointerEvents="none" width={size.w} height={size.h} style={{ position: "absolute", top: 0, left: 0 }}>
          <Rect
            x={inset}
            y={inset}
            width={Math.max(size.w - strokeWidth, 0)}
            height={Math.max(size.h - strokeWidth, 0)}
            rx={Math.max(radius - inset, 0)}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${DOT} ${gap}`}
            strokeLinecap="round"
          />
        </Svg>
      ) : null}
      {children}
    </View>
  );
}

/** Horizontal or vertical row of dots — replaces straight divider lines */
export function DottedLine({
  vertical,
  color = colors.dots,
  strokeWidth = 2,
  gap = 6,
  style,
}: {
  vertical?: boolean;
  color?: string;
  strokeWidth?: number;
  gap?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const [length, setLength] = useState(0);
  const thickness = strokeWidth + 2;

  return (
    <View
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden
      onLayout={(e) => setLength(vertical ? e.nativeEvent.layout.height : e.nativeEvent.layout.width)}
      style={[vertical ? { width: thickness, flex: 1 } : { height: thickness, alignSelf: "stretch" }, style]}
    >
      {length > 0 ? (
        <Svg width={vertical ? thickness : length} height={vertical ? length : thickness}>
          <Line
            x1={vertical ? thickness / 2 : strokeWidth}
            y1={vertical ? strokeWidth : thickness / 2}
            x2={vertical ? thickness / 2 : length - strokeWidth}
            y2={vertical ? length - strokeWidth : thickness / 2}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${DOT} ${gap}`}
            strokeLinecap="round"
          />
        </Svg>
      ) : null}
    </View>
  );
}
