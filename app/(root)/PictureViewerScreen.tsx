import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import { Dimensions, View } from "react-native";
import Animated from "react-native-reanimated";

import PanPinchView from "@/components/PanPinchView";
import CloseBackButton from "@/components/ui/CloseBackButton";
import { decodeSafePicUri } from "@/utils/pictureprocessing";

const PictureViewerScreen = () => {
  const params = useLocalSearchParams();

  const { width: winWitdh, height: winHeight } = Dimensions.get("window");

  const picUri = useMemo(() => {
    return decodeSafePicUri(params.picture.toString() || "");
  }, [params]);

  return (
    <View className="relative w-screen h-screen bg-black">
      <StatusBar hidden={true} />
      <PanPinchView
        minScale={1}
        initialScale={1}
        contentDimensions={{ width: winWitdh, height: winHeight }}
        containerDimensions={{ width: winWitdh, height: winHeight }}
      >
        <Animated.Image
          sharedTransitionTag="previewimage"
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
          source={{ uri: picUri }}
        ></Animated.Image>
      </PanPinchView>

      <CloseBackButton />
    </View>
  );
};

export default PictureViewerScreen;
