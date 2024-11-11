import React from "react";
import {
  ImageBackground,
  ImageBackgroundProps,
  ImageSourcePropType,
  View,
} from "react-native";

export interface MutedBGPhotoProps extends ImageBackgroundProps {
  overlay?: boolean;
  overlayType?: "dark" | "light";
  customOverLayColor?: string;
  overlayOpacity?: number;
  source?: ImageSourcePropType | undefined;
}

export default function MutedBGPhoto({
  children,
  overlay = true,
  overlayType = "dark",
  overlayOpacity = 0.5,
  className,
  source,
  customOverLayColor,
}: MutedBGPhotoProps) {
  const overlayColor = customOverLayColor
    ? customOverLayColor
    : overlayType === "dark"
      ? "rgba(0,0,0," + overlayOpacity + ")"
      : "rgba(255,255,255," + overlayOpacity + ")";

  return (
    <ImageBackground
      source={source}
      className={`relative w-full h-full ${className}`}
    >
      {overlay && (
        <View
          className="absolute top-0 left-0 w-full h-full"
          style={{ backgroundColor: overlayColor }}
        ></View>
      )}
      {children}
    </ImageBackground>
  );
}
