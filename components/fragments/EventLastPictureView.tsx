import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { View, ImageBackground, TouchableOpacity } from "react-native";

import { InternalImageData } from "@/types/pictureinfo";
import { encodeSafePicUri } from "@/utils/pictureprocessing";

import ThemeButton from "../ui/ThemeButton";

import LastPictureInfoBar from "./LastPictureInfoBar";

export interface EventLastPictureViewProps {
  picture: InternalImageData;
  doUpload: (delay: number) => void;
}

export default function EventLastPictureView({
  picture,
  doUpload,
}: EventLastPictureViewProps) {
  const imgClick = useCallback(() => {
    router.navigate({
      pathname: "/(root)/pictureviewer",
      params: {
        picture: encodeSafePicUri(picture.uri || ""),
        width: picture.width,
        height: picture.height,
      },
    });
  }, [picture]);

  const { t } = useTranslation();

  return (
    <ImageBackground
      className="border-primary border-1 w-full rounded-3xl flex-1 flex justify-end overflow-hidden elevation-md"
      imageStyle={{ borderRadius: 14 }}
      source={{ uri: picture.uri }}
    >
      <TouchableOpacity
        activeOpacity={1}
        className="flex flex-1 justify-end"
        onPress={imgClick}
      >
        <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]}>
          <View className="p-4 flex items-center justify-center">
            {!picture.wasUploaded && (
              <ThemeButton
                onPress={() => {
                  doUpload(10);
                }}
                title={t("event-generic-upload")}
                iconLeft={{ name: "cloud-upload-outline" }}
              ></ThemeButton>
            )}
            {picture.wasUploaded && <LastPictureInfoBar picture={picture} />}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </ImageBackground>
  );
}
