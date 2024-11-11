import React, { useEffect, useRef } from "react";
import { Animated, Text } from "react-native";

import useTheme from "@/hooks/useTheme";
import { TagInputTagProps } from "@/types/type";

import SimpleIconButton from "./SimpleIconButton";

export default function TagInputTag({ tag, onDelete }: TagInputTagProps) {
  const { getVarColor } = useTheme();

  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  const internalDelete = (tag: string) => {
    Animated.timing(scale, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(({ finished }) => {
      onDelete(tag);
    });
  };

  return (
    <Animated.View
      style={{ transform: [{ scale: scale }] }}
      className="flex-0 flex items-center flex-row bg-lightsec py-0 px-2 pl-3 border-primary border-2 rounded-full"
    >
      <Text className="text-textmain font-NunitoSemiBold text-md">#{tag}</Text>
      <SimpleIconButton
        onPressWithTag={internalDelete}
        tag={tag}
        backGround="p-1 m-0 ml-0"
        icon={{
          name: "close",
          size: 18,
          color: getVarColor("--color-text-main"),
        }}
      />
    </Animated.View>
  );
}
