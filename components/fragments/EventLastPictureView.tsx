import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  ImageBackground,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";

import { InternalImageData } from "@/types/pictureinfo";

import ThemeBasicButton from "../ui/themed/ThemeBasicButton";
import ThemeText from "../ui/themed/ThemeText";

import LastPictureInfoBar from "./LastPictureInfoBar";

export interface EventLastPictureViewProps {
  picture: InternalImageData;
  doUpload: (delay: number) => void;
  onPictureClick?: (uri: string) => void;
  isUploading: boolean;
}

export default function EventLastPictureView({
  picture,
  doUpload,
  onPictureClick,
  isUploading,
}: EventLastPictureViewProps) {
  const imgClick = useCallback(() => {
    if (onPictureClick) {
      onPictureClick(picture.uri || "");
    }
  }, [onPictureClick, picture.uri]);

  const { t } = useTranslation();

  const [uploadWaiting, setUploadWaiting] = React.useState(false);

  useEffect(() => {
    if (isUploading) {
      setUploadWaiting(true);
    }

    if (!isUploading && uploadWaiting) {
      setUploadWaiting(false);

      if (!picture.wasUploaded) {
        Alert.alert(
          t("event-picture-upload-error-title"),
          t("event-picture-upload-error-message"),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUploading, picture, uploadWaiting]);

  return (
    <ImageBackground
      className="border-primary border-1 w-full rounded-3xl flex-1 flex justify-end overflow-hidden elevation-md"
      imageStyle={{ borderRadius: 14 }}
      source={{ uri: picture.uri }}
    >
      <Pressable className="flex flex-1 justify-end" onPress={imgClick}>
        {isUploading && (
          <View className="absolute bottom-0 left-0 right-0 top-0 m-16 p-8 bg-[rgba(0,0,0,0.75)] rounded-2xl flex items-center justify-center gap-4">
            <ThemeText className="text-white font-bold text-xl text-center">
              {t("event-picture-uploading")}
            </ThemeText>
            <ActivityIndicator size={"large"} color="white" />
          </View>
        )}

        <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]}>
          <View className="p-4 flex items-center justify-center">
            {!picture.wasUploaded && !isUploading && (
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
