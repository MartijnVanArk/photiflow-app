import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { useRef } from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import CloseBackButton from "@/components/ui/CloseBackButton";
import ThemeBasicButton from "@/components/ui/themed/ThemeBasicButton";
import ThemeStatusBar from "@/components/ui/themed/ThemeStatusBar";
import WorkingIndicator from "@/components/ui/WorkingIndicator";
import useImageViewer from "@/hooks/useImageViewer";
import { simpleTypeGetter } from "@/utils/typing";

export default function TestScreen() {
  const { viewerVisible, showImageViewer, ImageModal } = useImageViewer();

  const picRef = useRef<View>(null);

  const router = useRouter();

  const test = () => {};

  const nav = useNavigation();

  return (
    <>
      <SafeAreaView className="bg-light h-full flex items-center gap-4 justify-center">
        <ThemeStatusBar
          style={viewerVisible ? "light" : "auto"}
          backgroundColor="transparent"
        />

        <WorkingIndicator />

        <ThemeBasicButton title="test" onPress={test} />

        <Pressable
          onPress={() =>
            showImageViewer(
              "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
            )
          }
        >
          <Animated.View ref={picRef}>
            <Image
              source={{
                uri: "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
              }}
              style={{ width: 100, height: 100 }}
            />
          </Animated.View>
        </Pressable>

        <CloseBackButton />
      </SafeAreaView>
      <ImageModal />
    </>
  );
}
