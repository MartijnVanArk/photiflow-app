import React, { useEffect, useMemo } from "react";
import { PixelRatio, View, ViewProps } from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";
import Svg, { Circle } from "react-native-svg";

import useTheme from "@/hooks/useTheme";

export interface CircularProgressProps extends ViewProps {
  size?: number;
  thickness?: number;
  progress?: number;
}

const ratio = PixelRatio.get();

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({
  size = 80,
  thickness = 8,
  style,
  progress = 0,
  ...props
}: CircularProgressProps) => {
  const { getVarColor } = useTheme();

  const colors = useMemo(() => {
    return {
      inner: getVarColor("--color-primary-default"),
      background: getVarColor("--color-grey-default"),
    };
  }, [getVarColor]);

  const animatedProgress = useSharedValue(progress);

  useEffect(() => {
    animatedProgress.value = withTiming(progress ?? 0, {
      duration: 1000,
    });
    //    eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  const sizes = useMemo(() => {
    const nR = ((size - thickness) * ratio) / 2;
    return {
      R: nR,
      Cx: (size * ratio) / 2,
      Cy: (size * ratio) / 2,
      Sw: thickness * ratio,
      ArrL: 2 * Math.PI * nR,
    };
  }, [size, thickness]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: sizes.ArrL * (1 - animatedProgress.get()),
    opacity: animatedProgress.get() === 0 ? 0 : 1,
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(animatedProgress.get() * 100)}%`;
  });

  return (
    <View
      style={[
        style,
        {
          width: size * ratio,
          height: size * ratio,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          margin: 4 * ratio,
        },
      ]}
      {...props}
    >
      <ReText
        text={progressText}
        style={{
          color: getVarColor("--color-text-secondary"),
          fontFamily: "Nunito-SemiBold",
          fontSize: 10 * ratio,
          lineHeight: 16 * ratio,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
        }}
      ></ReText>
      <Svg
        style={{
          width: size * ratio,
          height: size * ratio,
        }}
      >
        <Circle
          fill="none"
          cx={sizes.Cx}
          cy={sizes.Cy}
          r={sizes.R}
          stroke={colors.background}
          strokeWidth={sizes.Sw}
        />
        <AnimatedCircle
          animatedProps={animatedProps}
          fill="none"
          cx={sizes.Cx}
          cy={sizes.Cy}
          r={sizes.R}
          stroke={colors.inner}
          strokeWidth={sizes.Sw / 2}
          strokeDasharray={sizes.ArrL - 0}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

export default CircularProgress;
