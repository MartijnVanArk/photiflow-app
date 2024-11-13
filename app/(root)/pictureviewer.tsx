import { router, useLocalSearchParams } from "expo-router";
import { Dimensions, PixelRatio, View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import PanPinchView from "@/components/PanPinchView";
import CloseBackButton from "@/components/ui/CloseBackButton";
import SimpleIconButton from "@/components/ui/SimpleIconButton";
import { decodeSafePicUri } from "@/utils/pictureprocessing";

const PictureViewer = () => {
  const params = useLocalSearchParams();

  const { width: winWitdh, height: winHeight } = Dimensions.get("window");

  const picUri = decodeSafePicUri(params.picture.toString() || "");

  const inset = useSafeAreaInsets();
  const ratio = PixelRatio.get();

  return (
    <View className="relative w-screen h-screen bg-black">
      <PanPinchView
        minScale={1}
        initialScale={1}
        contentDimensions={{ width: winWitdh, height: winHeight }}
        containerDimensions={{ width: winWitdh, height: winHeight }}
      >
        <Animated.Image
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
          source={{ uri: picUri }}
        ></Animated.Image>
      </PanPinchView>

      <CloseBackButton />
    </View>
  );
};

export default PictureViewer;
