import { Image } from "expo-image";
import moment from "moment";
import React from "react";
import { View, ViewProps, Pressable } from "react-native";

import DynamicAvatar from "@/components/ui/DynamicAvatar";
import SimpleIconButton from "@/components/ui/SimpleIconButton";
import ThemeText from "@/components/ui/themed/ThemeText";
import useTheme from "@/hooks/useTheme";
import { encodeSafePicUri } from "@/utils/pictureprocessing";

export interface MyPictureListItemProps extends ViewProps {
  item?: any;
  onPictureClick?: (uri: string) => void;
}

export default function MyPictureListItem({
  item,
  onPictureClick,
  ...props
}: MyPictureListItemProps) {
  const { getVarColor } = useTheme();

  const openImageViewer = (uri: string) => {
    if (onPictureClick) {
      onPictureClick(uri);
    }
  };

  return (
    <View className="py-4">
      <View className="flex-row items-center gap-4 py-2 px-4 ">
        <DynamicAvatar name={item.guest.name} imageUri={item.guest.image} />
        <View className="flex-1">
          <ThemeText className="font-NunitoBold">{item.guest.name}</ThemeText>
          <ThemeText className="text-textsecondary text-md">
            {moment(item.timeTaken).fromNow()}
          </ThemeText>
        </View>
        <View>
          <SimpleIconButton
            icon={{
              name: "dots-vertical",
              size: 24,
              color: getVarColor("--color-text-main"),
            }}
          />
        </View>
      </View>

      <View className="flex rounded-xl overflow-hidden mx-4">
        <Pressable onPress={() => openImageViewer(encodeSafePicUri(item.uri))}>
          <Image
            placeholder={item.blurhash}
            source={{
              uri: item.uri + "?" + item.id,
              width: 3000,
              height: 2000,
            }}
            style={{ width: "100%", height: 300 }}
            //    transition={500}
            contentFit="cover"
          />
        </Pressable>

        <View className="px-4 py-2 bg-overlay2">
          <ThemeText>{item.comment}</ThemeText>
          <ThemeText className="text-primary">
            {"#" + item.tags.join(" #")}
          </ThemeText>
        </View>
      </View>
    </View>
  );
}
