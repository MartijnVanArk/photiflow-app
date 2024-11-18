import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import CircularProgress from "@/components/circleprogress/CircularProgress";
import CloseBackButton from "@/components/ui/CloseBackButton";
import ThemeBasicButton from "@/components/ui/themed/ThemeBasicButton";
import ThemeStatusBar from "@/components/ui/themed/ThemeStatusBar";
import ThemeText from "@/components/ui/themed/ThemeText";
import WorkingIndicator from "@/components/ui/WorkingIndicator";
import useImageViewer from "@/hooks/useImageViewer";

export default function TestScreen() {
  const [progress, setProgress] = useState(0.3);

  const { viewerVisible, showImageViewer, ImageModal } = useImageViewer();

  return (
    <>
      <SafeAreaView className="bg-light h-full flex items-center gap-4 justify-center">
        <ThemeStatusBar
          style={viewerVisible ? "light" : "auto"}
          backgroundColor="transparent"
        />
        <ThemeText>Progress Animator</ThemeText>
        <CircularProgress progress={progress} />
        <ThemeBasicButton
          title="random progress"
          onPress={() => setProgress(Math.random())}
        />

        <WorkingIndicator />

        <ThemeBasicButton
          title="test"
          onPress={() =>
            showImageViewer(
              "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
            )
          }
        />

        <CloseBackButton />
      </SafeAreaView>
      <ImageModal />
    </>
  );
}
