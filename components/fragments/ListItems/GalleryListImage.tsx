import { Image } from "expo-image";
import React, { useRef } from "react";
import { ViewProps, PixelRatio, Animated, Pressable } from "react-native";

export interface GalleryListImageProps extends ViewProps {
  item: any;
  index: number;
  targetWidth: number;
  targetHeight: number;
  onPictureClick?: (uri: string) => void;
}

const ratio = PixelRatio.get();
export default function GalleryListImage({
  item,
  index,
  targetHeight,
  targetWidth,
  style,
  onPictureClick,
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
      <Pressable
        onPress={() => {
          if (onPictureClick) {
            onPictureClick(item.uri);
          }
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
      </Pressable>
    </Animated.View>
  );
}
