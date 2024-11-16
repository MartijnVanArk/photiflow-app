import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useMemo } from "react";
import { Pressable } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { getIconNameFromNavPath } from "@/utils/iconutils";
import { tryGetNavPath } from "@/utils/routing";

export default function TabbarButton({
  isFocused,
  label,
  route,
  color,
  navigation,
  ...props
}: any) {
  const scale = useSharedValue(0);

  const buttonPath = useMemo(() => {
    const fullPath = tryGetNavPath(navigation).split("/");

    fullPath.pop();
    fullPath.push(route.name);

    return fullPath.join("/");
  }, [navigation, route.name]);

  useEffect(() => {
    const toValue =
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused;

    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 },
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.5]);
    const top = interpolate(scale.value, [0, 1], [0, 8]);

    return {
      // styles
      transform: [{ scale: scaleValue }],
      top,
    };
  });
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      // styles
      opacity,
    };
  });

  return (
    <Pressable
      {...props}
      className="flex flex-1 flex-col items-center gap-1 h-full justify-center "
    >
      <Animated.View style={[animatedIconStyle]}>
        <MaterialCommunityIcons
          name={getIconNameFromNavPath(buttonPath)}
          size={24}
          color={!isFocused ? color : "white"}
        />
      </Animated.View>
      <Animated.Text
        lineBreakMode={"clip"}
        numberOfLines={1}
        className="font-NunitoSemiBold"
        style={[
          {
            color,
            fontSize: 13,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}
