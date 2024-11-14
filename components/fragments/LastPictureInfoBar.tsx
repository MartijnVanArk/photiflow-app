import React from "react";
import { View } from "react-native";

import { InternalImageData } from "@/types/pictureinfo";
import { formatDate } from "@/utils/generic/datestuff";
import { formatTags } from "@/utils/tagutils";

import DynamicAvatar from "../ui/DynamicAvatar";
import ThemeText from "../ui/ThemeText";

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
          <ThemeText className="text-white">{picture.guest.name}</ThemeText>
        )}
        <ThemeText className="text-slate-400">
          {formatDate(picture.timeTaken)}
        </ThemeText>
        {picture.comment && (
          <ThemeText className="text-white">{picture.comment}</ThemeText>
        )}
        {picture.tags.length > 0 && (
          <ThemeText className="text-white">
            {formatTags(picture.tags)}
          </ThemeText>
        )}
      </View>
    </View>
  );
}
