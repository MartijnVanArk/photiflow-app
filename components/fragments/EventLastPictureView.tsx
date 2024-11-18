import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { View, ImageBackground, Pressable } from "react-native";

import { InternalImageData } from "@/types/pictureinfo";

import ThemeBasicButton from "../ui/themed/ThemeBasicButton";

import LastPictureInfoBar from "./LastPictureInfoBar";

export interface EventLastPictureViewProps {
  picture: InternalImageData;
  doUpload: (delay: number) => void;
  onPictureClick?: (uri: string) => void;
}

export default function EventLastPictureView({
  picture,
  doUpload,
  onPictureClick,
}: EventLastPictureViewProps) {
  const imgClick = useCallback(() => {
    if (onPictureClick) {
      onPictureClick(picture.uri || "");
    }
  }, [onPictureClick, picture.uri]);

  const { t } = useTranslation();

  return (
    <ImageBackground
      className="border-primary border-1 w-full rounded-3xl flex-1 flex justify-end overflow-hidden elevation-md"
      imageStyle={{ borderRadius: 14 }}
      source={{ uri: picture.uri }}
    >
      <Pressable className="flex flex-1 justify-end" onPress={imgClick}>
        <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]}>
          <View className="p-4 flex items-center justify-center">
            {!picture.wasUploaded && (
              <ThemeBasicButton
                onPress={() => {
                  doUpload(10);
                }}
                title={t("event-generic-upload")}
                iconLeft={{ name: "cloud-upload-outline" }}
              />
            )}
            {picture.wasUploaded && <LastPictureInfoBar picture={picture} />}
          </View>
        </LinearGradient>
      </Pressable>
    </ImageBackground>
  );
}
