import React, { useMemo } from "react";
import { View, Text, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

export interface ThemeTextProps extends TextProps {}

export default function ThemeText({
  children,
  className,
  ...props
}: ThemeTextProps) {
  const useClassName = useMemo(() => {
    return twMerge("font-Nunito text-lg text-textmain", className || "");
  }, [className]);

  return (
    <Text className={useClassName} {...props}>
      {children}
    </Text>
  );
}
