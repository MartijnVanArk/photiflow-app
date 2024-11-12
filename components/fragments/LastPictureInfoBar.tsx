import React from "react";
import { View, Text } from "react-native";

import { InternalImageData } from "@/types/pictureinfo";
import { formatDate } from "@/utils/datestuff";
import { formatTagMap } from "@/utils/tagutils";

import DynamicAvatar from "../ui/DynamicAvatar";

export interface LastPictureInfoBarProps {
  picture: InternalImageData;
}

export default function LastPictureInfoBar({
  picture,
}: LastPictureInfoBarProps) {
  return (
    <View className="flex gap-4 flex-row w-full bg-overlaydark py-2 px-4 rounded-md">
      <DynamicAvatar
        className="mt-[2]"
        size={13}
        name={picture.guest.name}
        imageUri={picture.guest.avatar}
      />

      <View className="flex-1 flex ">
        {picture.guest.name && (
          <Text className="font-Nunito text-white">{picture.guest.name}</Text>
        )}
        <Text className="font-Nunito text-slate-400">
          {formatDate(picture.timeTaken)}
        </Text>
        {picture.comment && (
          <Text className="font-Nunito text-white">{picture.comment}</Text>
        )}
        {picture.tags.size > 0 && (
          <Text className="font-Nunito text-white">
            {formatTagMap(picture.tags)}
          </Text>
        )}
      </View>
    </View>
  );
}
