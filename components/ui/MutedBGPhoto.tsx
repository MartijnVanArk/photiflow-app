import { ImageBackground, ImageBackgroundProps } from "expo-image";
import React, { useMemo } from "react";
import { ImageSourcePropType, useWindowDimensions, View } from "react-native";

export interface MutedBGPhotoProps extends ImageBackgroundProps {
  overlay?: boolean;
  overlayType?: "dark" | "light";
  customOverLayColor?: string;
  overlayOpacity?: number;
  source?: ImageSourcePropType | undefined;
  placeholder?: string;
}

export default function MutedBGPhoto({
  children,
  overlay = true,
  overlayType = "dark",
  overlayOpacity = 0.5,
  className,
  source,
  customOverLayColor,
  placeholder,
}: MutedBGPhotoProps) {
  const overlayColor = useMemo(() => {
    return customOverLayColor
      ? customOverLayColor
      : overlayType === "dark"
        ? "rgba(0,0,0," + overlayOpacity + ")"
        : "rgba(255,255,255," + overlayOpacity + ")";
  }, [customOverLayColor, overlayOpacity, overlayType]);

  const { width, height } = useWindowDimensions();

  return (
    <ImageBackground
      placeholder={{ blurhash: placeholder }}
      style={{ width, height }}
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
