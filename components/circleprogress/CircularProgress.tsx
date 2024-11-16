import React, { useCallback, useEffect, useMemo } from "react";
import {
  PixelRatio,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
import { ReText } from "react-native-redash";
import Svg, { Circle } from "react-native-svg";

import useTheme from "@/hooks/useTheme";

import ThemeText from "../ui/themed/ThemeText";

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
  progress,
  ...props
}: CircularProgressProps) => {
  const { getVarColor } = useTheme();

  const colors = useMemo(() => {
    return {
      inner: getVarColor("--color-primary-default"),
      background: getVarColor("--color-grey-default"),
    };
  }, [getVarColor]);

  const animatedProgress = useSharedValue(progress ?? 0);

  useEffect(() => {
    animatedProgress.value = withTiming(progress ?? 0, {
      duration: 1000,
    });
  }, [animatedProgress, progress]);

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
    strokeDashoffset: sizes.ArrL * (1 - animatedProgress.value),
    opacity: animatedProgress.value === 0 ? 0 : 1,
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(animatedProgress.get() * 100)}%`;
  });

  return (
    <View
      className="flex items-center justify-center m-4 relative "
      style={[style, { width: size * ratio, height: size * ratio }]}
      {...props}
    >
      <ReText
        text={progressText}
        className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] font-NunitoSemiBold text-3xl text-textmain"
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
