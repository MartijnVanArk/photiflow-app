import { router } from "expo-router";
import React from "react";
import { PixelRatio } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import SimpleIconButton, { SimpleIconButtonProps } from "./SimpleIconButton";

export interface CloseBackButtonProps extends SimpleIconButtonProps {
  color?: string;
  background?: string;
  iconName?: string;
  noAbsolute?: boolean;
  onPress?: () => void;
}

const CloseBackButton = ({
  color = "white",
  backGround = "#00000066",
  iconName = "arrow-left",
  noAbsolute = false,
  ...props
}) => {
  const inset = useSafeAreaInsets();
  const ratio = PixelRatio.get();

  const doClose = () => {
    if (props.onPress) {
      props.onPress();
    } else {
      router.back();
    }
  };

  return (
    <SimpleIconButton
      style={{
        backgroundColor: backGround,
        position: noAbsolute ? "relative" : "absolute",
        top: noAbsolute ? undefined : inset.top + 8 * ratio,
        left: noAbsolute ? undefined : inset.left + 8 * ratio,
      }}
      onPress={doClose}
      className="p-2"
      icon={{ name: iconName, color: color }}
    />
  );
};

export default CloseBackButton;
