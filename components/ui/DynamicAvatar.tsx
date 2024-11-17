import { Image, ImageSource, ImageStyle } from "expo-image";
import React, { useMemo, useState } from "react";
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
  const [imageLoading, setImageLoading] = useState(true);

  const { nameAbrev, colorInfo } = useMemo(() => {
    return {
      nameAbrev: getNameAbbreviaton(name),
      colorInfo: generateColorsForText(name),
    };
  }, [name]);

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
      {(!imageUri || imageError || imageLoading) && !fallback && (
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
      {(imageUri || fallback) && !imageError && (
        <Image
          //          cachePolicy="none"
          onLoadStart={() => {
            console.log("load start");
          }}
          style={[
            {
              opacity: !imageError && !imageLoading ? 1 : 0,
              width: "100%",
              height: "100%",
            },
            styleExtra,
          ]}
          onLoadEnd={() => {
            setImageLoading(false);
          }}
          source={imageUri || fallback}
          onError={() => setImageError(true)}
        />
      )}
    </View>
  );
}
