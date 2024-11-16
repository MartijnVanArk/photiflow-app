import { Image } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import moment from "moment";
import React, { useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import PageHeader from "@/components/header/PageHeader";
import DynamicAvatar from "@/components/ui/DynamicAvatar";
import SimpleIconButton from "@/components/ui/SimpleIconButton";
import ThemeText from "@/components/ui/themed/ThemeText";
import useGuestContext from "@/hooks/useGuestContext";
import useTheme from "@/hooks/useTheme";
import { encodeSafePicUri } from "@/utils/pictureprocessing";

const countries = [
  {
    id: "1",
    uri: "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
    guest: {
      name: "Martijn van Ark",
      image: "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
      id: "O54321",
    },
    comment: "wat een gezellig feestje",
    timeTaken: "2024-11-08 13:12:14",
    tags: ["party", "fun", "social"],
  },
  {
    id: "2",
    uri: "https://www.scanid.nl/test.jpg",
    guest: {
      name: "Kees Klootviool",
      image: "https://avatar.iran.liara.run/public",
      id: "O54321",
    },
    comment: "wat een gezellig feestje",
    timeTaken: "2024-11-08 13:12:14",
    tags: ["party", "fun", "social"],
  },
  {
    id: "3",
    uri: "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
    guest: {
      name: "Martijn van Ark",
      image: "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
      id: "O54321",
    },
    comment: "wat een gezellig feestje",
    timeTaken: "2024-11-08 13:12:14",
    tags: ["party", "fun", "social"],
  },
  {
    id: "4",
    uri: "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
    guest: {
      name: "Martijn van Ark",
      image: "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
      id: "O54321",
    },
    comment: "wat een gezellig feestje",
    timeTaken: "2024-11-08 13:12:14",
    tags: ["party", "fun", "social"],
  },
  {
    id: "5",
    uri: "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
    guest: {
      name: "Martijn van Ark",
      image: "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
      id: "O54321",
    },
    comment: "wat een gezellig feestje",
    timeTaken: "2024-11-08 13:12:14",
    tags: ["party", "fun", "social"],
  },
];

const blurhash = "blurhash:/LIIEeLwc1jRiP;X8ayR+crWBIpt7";

const AnimatedPreviewImage = Animated.createAnimatedComponent(Image);

export default function MyPicturesScreen() {
  const { getVarColor } = useTheme();

  const headerVisibility = useSharedValue(1);
  const headerVisibilityDirect = useSharedValue(1);
  const measuredHeaderHeigth = useRef(60);
  const lastScrollY = useSharedValue(0);

  const { guestInfo } = useGuestContext();

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      //      opacity: headerVisibility.value,
      height: interpolate(
        headerVisibility.value,
        [0, 1],
        [0, measuredHeaderHeigth.current],
      ),
    };
  });

  const openImageViewer = (uri: string) => {
    router.push({
      pathname: "/(root)/PictureViewerScreen",
      params: {
        picture: uri,
      },
    });
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      const diff = event.contentOffset.y - lastScrollY.value;

      if (Math.abs(diff) > 20) {
        const on = diff > 0 ? 0 : 1;

        if (headerVisibilityDirect.get() !== on) {
          headerVisibilityDirect.value = on;
          headerVisibility.value = withTiming(on, { duration: 300 });
        }

        lastScrollY.value = event.contentOffset.y;
      }
    },
  });

  return (
    <SafeAreaView className="h-full flex items-center justify-center">
      <PageHeader
        handleInset={false}
        style={animatedHeaderStyle}
        onLayout={(e) => {
          if (measuredHeaderHeigth.current === 0) {
            measuredHeaderHeigth.current = e.nativeEvent.layout.height;
          }
        }}
        right={
          <DynamicAvatar
            size={14}
            name={guestInfo.name}
            imageUri={guestInfo.avatar}
          />
        }
      />

      <StatusBar
        style="light"
        backgroundColor={getVarColor("--color-primary-default")}
      />
      <Animated.FlatList
        onScroll={onScroll}
        scrollEventThrottle={16}
        className="flex-1 w-full h-full "
        data={countries}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View className="py-4">
            <View className="flex-row items-center gap-4 py-2 px-4 ">
              <DynamicAvatar
                name={item.guest.name}
                imageUri={item.guest.image}
              />
              <View className="flex-1">
                <ThemeText className="font-NunitoBold">
                  {item.guest.name}
                </ThemeText>
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
              <TouchableOpacity
                onPress={() => openImageViewer(encodeSafePicUri(item.uri))}
              >
                <AnimatedPreviewImage
                  sharedTransitionTag="previewimage"
                  placeholder={blurhash}
                  source={{
                    uri: item.uri,
                    width: 3000,
                    height: 2000,
                  }}
                  style={{ width: "100%", height: 300 }}
                  //    transition={500}
                  contentFit="cover"
                />
              </TouchableOpacity>

              <View className="px-4 py-2 bg-overlay2">
                <ThemeText>{item.comment}</ThemeText>
                <ThemeText className="text-primary">
                  {"#" + item.tags.join(" #")}
                </ThemeText>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
