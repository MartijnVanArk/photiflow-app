import { Image } from "expo-image";
import { useRef } from "react";
import { Animated, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CloseBackButton from "@/components/ui/CloseBackButton";
import ThemeStatusBar from "@/components/ui/themed/ThemeStatusBar";
import WorkingIndicator from "@/components/ui/WorkingIndicator";
import useImageViewer from "@/hooks/useImageViewer";

export default function TestScreen() {
  const { viewerVisible, showImageViewer, ImageModal } = useImageViewer();

  const picRef = useRef<View>(null);

  return (
    <>
      <SafeAreaView className="bg-light h-full flex items-center gap-4 justify-center">
        <ThemeStatusBar
          style={viewerVisible ? "light" : "auto"}
          backgroundColor="transparent"
        />

        <WorkingIndicator />

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

        <Image
          source={{
            uri: "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
          }}
          style={{ width: 100, height: 100 }}
        />

        <CloseBackButton />
      </SafeAreaView>
      <ImageModal />
    </>
  );
}
