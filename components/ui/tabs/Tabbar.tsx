import { useRef, useState } from "react";
import { LayoutChangeEvent, PixelRatio } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import useTheme from "@/hooks/useTheme";

import TabbarButton from "./TabbarButton";

import type { BottomTabBarProps } from "@react-navigation/bottom-tabs/src/types";

const ratio = PixelRatio.get();

const margin = ratio * 2;

export default function Tabbar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const [dim, setDim] = useState({ width: 0, height: 0 });

  const barRef = useRef<Animated.View>(null);

  const buttonWidth = dim.width / state.routes.length;
  const buttonHeight = dim.height;

  const onLayout = (e: LayoutChangeEvent) => {
    setDim({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  };

  const slidePos = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slidePos.value }],
    };
  });

  const { getVarColor } = useTheme();

  return (
    <Animated.View
      ref={barRef}
      onLayout={onLayout}
      className="absolute bottom-6 py-4 justify-between items-center flex flex-row
      w-auto rounded-2xl overflow-hidden left-6 right-6"
      style={[
        {
          backgroundColor: getVarColor("--color-light-med"),
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        },
      ]}
    >
      <Animated.View
        className={"absolute bg-primary"}
        style={[
          animStyle,
          {
            left: 0,
            height: buttonHeight - margin * 2,
            width: buttonWidth - margin * 2,
            margin: margin,
            borderRadius: 6 * ratio,
          },
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          slidePos.value = withSpring(index * buttonWidth, {
            duration: 1000,
          });

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabbarButton
            navigation={navigation}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.name}
            label={label}
            isFocused={isFocused}
            route={route}
            color={
              isFocused
                ? getVarColor("--color-primary-default")
                : getVarColor("--color-text-secondary")
            }
          />
        );
      })}
    </Animated.View>
  );
}
