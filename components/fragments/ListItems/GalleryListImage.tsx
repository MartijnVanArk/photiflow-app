import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { View, ViewProps, PixelRatio, TouchableOpacity } from "react-native";

import { encodeSafePicUri } from "@/utils/pictureprocessing";

export interface GalleryListImageProps extends ViewProps {
  item: any;
  targetWidth: number;
  targetHeight: number;
}

const ratio = PixelRatio.get();
export default function GalleryListImage({
  item,
  targetHeight,
  targetWidth,
  style,
  ...props
}: GalleryListImageProps) {
  return (
    <View
      className="flex items-center justify-center overflow-hidden "
      style={[{ width: targetWidth, height: targetHeight }, style]}
      {...props}
    >
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/(root)/PictureViewerScreen",
            params: {
              picture: encodeSafePicUri(item.uri + "?" + item.id),
            },
          });
        }}
      >
        <Image
          source={{
            uri: item.uri + "?" + item.id,
            width: 3000,
            height: 2000,
          }}
          placeholder={item.blurhash}
          style={{
            width: targetWidth - 2,
            height: targetHeight - 2,
            margin: 1,
            borderRadius: 4 * ratio,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
