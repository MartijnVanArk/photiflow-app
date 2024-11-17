import { StatusBar, StatusBarProps } from "expo-status-bar";
import React from "react";

import useTheme from "@/hooks/useTheme";

export default function ThemeStatusBar({
  animated = true,
  hidden = false,
  style,
  hideTransitionAnimation = "fade",
  backgroundColor,
  ...props
}: StatusBarProps) {
  const { getVarColor } = useTheme();

  return (
    <StatusBar
      backgroundColor={
        backgroundColor
          ? backgroundColor
          : getVarColor("--color-primary-default")
      }
      animated={animated}
      hidden={hidden}
      style={style ? style : "light"}
      {...props}
    />
  );
}
