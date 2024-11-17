import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useRef } from "react";
import {
  ViewProps,
  PixelRatio,
  TouchableOpacity,
  Animated,
} from "react-native";

import { encodeSafePicUri } from "@/utils/pictureprocessing";

export interface GalleryListImageProps extends ViewProps {
  item: any;
  index: number;
  targetWidth: number;
  targetHeight: number;
}

const AnimatedExpoImage = Animated.createAnimatedComponent(Image);

const ratio = PixelRatio.get();
export default function GalleryListImage({
  item,
  index,
  targetHeight,
  targetWidth,
  style,
  ...props
}: GalleryListImageProps) {
  const scale = useRef(new Animated.Value(0)).current;

  return (
    <Animated.View
      onLayout={() => {
        Animated.spring(scale, {
          delay: index * 25,
          toValue: 1,
          useNativeDriver: true,
        }).start();
      }}
      className="flex items-center justify-center overflow-hidden "
      style={[
        { width: targetWidth, height: targetHeight, transform: [{ scale }] },
        style,
      ]}
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
        <AnimatedExpoImage
          sharedTransitionTag="previewimage"
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
    </Animated.View>
  );
}
