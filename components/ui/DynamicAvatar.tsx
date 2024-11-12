import { Image, ImageSource, ImageStyle } from "expo-image";
import React, { useState } from "react";
import { View, Text, PixelRatio, StyleProp } from "react-native";

import { generateColorsForText } from "@/utils/generic/colorutils";
import { getNameAbbreviaton } from "@/utils/generic/nameparsing";

export interface DynamicAvatarProps {
  size?: number;
  name: string;
  imageUri: string;
  className?: string;
  fallback?:
    | string
    | number
    | ImageSource
    | ImageSource[]
    | string[]
    | null
    | undefined;
  styleExtra?: StyleProp<ImageStyle>;
}

const ratio = PixelRatio.get();

export default function DynamicAvatar({
  size = 16,
  imageUri,
  name,
  className,
  fallback,
  styleExtra,
}: DynamicAvatarProps) {
  const [imageError, setImageError] = useState(false);

  const nameAbrev = getNameAbbreviaton(name);
  const colorInfo = generateColorsForText(name);

  return (
    <View
      className={className}
      style={{
        borderRadius: size * ratio,
        display: "flex",
        overflow: "hidden",
        width: size * ratio,
        height: size * ratio,
      }}
    >
      {(!imageUri || imageError) && !fallback && (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colorInfo.background,
            width: "100%",
            height: "100%",
          }}
        >
          <Text
            style={{
              fontSize: (size * ratio) / 2.5,
              color: colorInfo.foreground,
            }}
            className="font-NunitoExtraBold"
          >
            {nameAbrev}
          </Text>
        </View>
      )}
      {((imageUri && !imageError) || fallback) && (
        <Image
          cachePolicy="none"
          onLoadStart={() => setImageError(false)}
          style={[{ width: "100%", height: "100%" }, styleExtra]}
          source={imageUri || fallback}
          onError={() => setImageError(true)}
        />
      )}
    </View>
  );
}
