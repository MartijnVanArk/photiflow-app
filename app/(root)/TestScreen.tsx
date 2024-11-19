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

import { jwtDecode, JwtPayload } from "jwt-decode";
export default function TestScreen() {
  const [progress, setProgress] = useState(0.3);

  const { viewerVisible, showImageViewer, ImageModal } = useImageViewer();

  const picRef = React.useRef<View>(null);

  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const test = async () => {
    console.log(
      parseCodeUrl("https://code.photobooth.com/src-2lXirrvabfIf4FK"),
    );

    // const token = await publicEventsApi.registerDevice("src-2lXirrvabfIf4FK");
    //    public

    //    console.log(token);

    const token =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6Imt5LTEyMzQ1IiwidHlwIjoiSldUIn0.eyJhdWQiOlsiaHR0cHM6Ly96a3Z6ZHcweDliLmV4ZWN1dGUtYXBpLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tIl0sImV2ZW50LWlkIjoiZXZ0LU9LNzdZWlBZdzJtcVpGQiIsImV4cCI6MTczMjIzMzYwMCwiaWF0IjoxNzMyMDQ1NDI0LCJpc3MiOiJodHRwczovL3prdnpkdzB4OWIuZXhlY3V0ZS1hcGkuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb20vIiwibmJmIjoxNzMxODg4MDAwLCJvd25lci1pZCI6ImF1dGgwfDY3MWViNjZiMDMwMGM5NjhhM2U0YjY5YyIsInNjb3BlIjoib3BlbmlkIiwic291cmNlLWlkIjoic3JjLTJsWGlycnZhYmZJZjRGSyIsInN1YiI6ImR2aS1KcjA1NWl1SFo4WGNpUmNQR2Y0WFMifQ.K1WauMz1yFMYmM9UTWkYpKdChNUHZEdTjQrvx_2Rm1hO9hc3YaBZH3V7DhiAEVZPEISefnNh84-Xr5b5TuYrqt3qW7eP9x9VJIEYRDoJlK1nW0bI9ulEIsXwz58XlRWeBsXIk3p48CHln1tmPZW4fPbKg7lPSD96CELAaWCfu4E";

    if (token) {
      console.log("token dec");

      const decoded = jwtDecode<JwtPayload>(token);

      console.log(decoded);
    }

    console.log("token end");

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
