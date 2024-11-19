import { Image } from "expo-image";
import React, { useState } from "react";
import { Animated, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { publicEventsApi } from "@/api/PublicEventApi/PublicEventApiClient";
import CircularProgress from "@/components/circleprogress/CircularProgress";
import CloseBackButton from "@/components/ui/CloseBackButton";
import ThemeBasicButton from "@/components/ui/themed/ThemeBasicButton";
import ThemeStatusBar from "@/components/ui/themed/ThemeStatusBar";
import ThemeText from "@/components/ui/themed/ThemeText";
import WorkingIndicator from "@/components/ui/WorkingIndicator";
import useImageViewer from "@/hooks/useImageViewer";
import { parseCodeUrl } from "@/utils/codeurls";

export default function TestScreen() {
  const [progress, setProgress] = useState(0.3);

  const { viewerVisible, showImageViewer, ImageModal } = useImageViewer();

  const picRef = React.useRef<View>(null);

  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const test = () => {
    console.log(
      parseCodeUrl("https://code.photobooth.com/src-2lXirrvabfIf4FK"),
    );

    publicEventsApi.registerDevice("test1234");
    //    public

    // publicEventsApi.registerDevice("test1234");
  };

  return (
    <>
      <SafeAreaView className="bg-light h-full flex items-center gap-4 justify-center">
        <ThemeStatusBar
          style={viewerVisible ? "light" : "auto"}
          backgroundColor="transparent"
        />
        <ThemeText>Progress Animator</ThemeText>
        {/* <CircularProgress progress={progress} /> */}
        <ThemeBasicButton
          title="random progress"
          onPress={() => setProgress(Math.random())}
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
            <AnimatedImage
              source={{
                uri: "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
              }}
              style={{ width: 100, height: 100 }}
            />
          </Animated.View>
        </Pressable>

        <ThemeBasicButton title="testcode" onPress={test} />

        <CloseBackButton />
      </SafeAreaView>
      <ImageModal />
    </>
  );
}
