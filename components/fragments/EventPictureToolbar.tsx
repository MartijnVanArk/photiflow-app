import * as ImagePicker from "expo-image-picker";
import { router, UnknownOutputParams } from "expo-router";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { View, Alert } from "react-native";

import { CCActionTypes } from "@/actions/CommandCenterActions";
import useCommandCenter from "@/hooks/useCommandCenter";

import ThemeButton from "../ui/themed/ThemeButton";

export interface EventPictureToolbarProps {
  params: UnknownOutputParams;
}

const EventPictureToolbar = ({ params }: EventPictureToolbarProps) => {
  const CC = useCommandCenter();
  const { t } = useTranslation();

  const pickImage = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: false,
      exif: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      legacy: true,
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      CC.perform({
        type: CCActionTypes.ADD_PIC_FROM_GALLERY,
        payload: {
          galleryPhoto: result,
        },
      });
    }
  }, [CC]);

  const goTakePicture = useCallback(() => {
    router.push({
      pathname: "/(root)/TakePictureScreen",
      params: { returnpath: "/(root)/EventScreen" },
    });
  }, []);

  const leave = useCallback(() => {
    Alert.alert(t("event-leave-title"), t("event-leave-message"), [
      {
        text: "Yes",
        onPress: () => {
          CC.perform({
            type: CCActionTypes.LEAVE_EVENT,
          });
          router.replace("/(start)/WelcomeScreen");
        },
      },
      { text: "No", style: "cancel" },
    ]);
  }, [CC, t]);

  return (
    <View className="flex w-full items-center justify-between flex-row gap-4">
      <ThemeButton
        onPress={pickImage}
        title=""
        variant="secondary"
        iconLeft={{ name: "view-gallery-outline" }}
      />
      <ThemeButton
        onPress={goTakePicture}
        title=""
        iconLeft={{ name: "camera", size: 36 }}
        className="p-8"
        rounded="rounded-full"
      />
      <ThemeButton
        onPress={leave}
        variant="secondary"
        title=""
        iconLeft={{ name: "exit-to-app" }}
      />
    </View>
  );
};

export default EventPictureToolbar;
