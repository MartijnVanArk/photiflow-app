import { Image } from "expo-image";
import moment from "moment";
import React from "react";
import { View, ViewProps, PixelRatio, Pressable } from "react-native";

import DynamicAvatar from "@/components/ui/DynamicAvatar";
import ThemeBasicButton from "@/components/ui/themed/ThemeBasicButton";
import ThemeText from "@/components/ui/themed/ThemeText";

export interface ModerationListItemProps extends ViewProps {
  item: any;
  onPicClick?: (uri: string) => void;
}

const ratio = PixelRatio.get();

const ModerationListItem = ({
  item,
  onPicClick,
  ...props
}: ModerationListItemProps) => {
  return (
    <View className="mx-4 my-2 bg-lightsec p-2 rounded-2xl flex-row gap-4 items-center">
      <Pressable
        onPress={() => {
          if (onPicClick) onPicClick(item.uri);
        }}
      >
        <Image
          source={{
            uri: item.uri + "?" + item.id,
            width: 3000,
            height: 2000,
          }}
          placeholder={item.blurhash}
          className="w-24 h-24 rounded-2xl"
          style={{
            width: 36 * ratio,
            height: 36 * ratio,
            borderRadius: 4 * ratio,
          }}
        ></Image>
      </Pressable>
      <View className="flex-1">
        <View className="flex-row gap-2 items-center">
          <DynamicAvatar
            size={14}
            name={item.guest.name}
            imageUri={item.guest.image}
          />
          <View>
            <ThemeText className="font-NunitoBold">{item.guest.name}</ThemeText>
            <ThemeText className="font-NunitosemiBold text-textsecondary text-md">
              {moment(item.timeTaken).fromNow()}
            </ThemeText>
          </View>
        </View>
        <ThemeText className="text-md mt-2">{item.comment}</ThemeText>
        <ThemeText className="text-red-400">{item.tags.join(", ")}</ThemeText>
      </View>
      <View className="flex-col  gap-2">
        <ThemeBasicButton
          iconLeft={{ name: "check" }}
          variant="success"
          className="py-2"
        />
        <ThemeBasicButton
          iconLeft={{ name: "close" }}
          variant="danger"
          className="py-2"
        />
      </View>
      {/* <Text>{JSON.stringify(item)}</Text> */}
    </View>
  );
};

export default ModerationListItem;
