import {
  CameraType,
  CameraView,
  FlashMode,
  useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CCActionTypes } from "@/actions/CommandCenterActions";
import CameraPermissionScreen from "@/components/CameraPermissionScreen";
import ShutterTrigger from "@/components/ui/ShutterTrigger";
import SimpleIconButton from "@/components/ui/SimpleIconButton";
import useCommandCenter from "@/hooks/useCommandCenter";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default function TakePictureScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");

  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef<CameraView>(null);

  const insets = useSafeAreaInsets();

  const CC = useCommandCenter();
  const { t } = useTranslation();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <CameraPermissionScreen requestPermission={requestPermission} />;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        base64: false,
        exif: true,
      });

      if (photo) {
        CC.perform({
          type: CCActionTypes.ADD_PIC_FROM_CAMERA,
          payload: {
            cameraPhoto: photo,
          },
        });

        router.navigate("/(root)/");
      } else {
        Alert.alert(
          t("takepicture-error-title"),
          t("takepicture-error-message"),
        );
      }
    }
  };

  const toggleFlash = () => {
    setFlash((curr) => (curr === "off" ? "on" : "off"));
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const back = () => {
    router.back();
  };

  return (
    <View className="flex-1 h-screen bg-black">
      <CameraView
        ref={cameraRef}
        style={{ width: winWidth, height: winHeight, zIndex: 0, elevation: 0 }}
        className="h-screen relative"
        facing={facing}
      >
        <View
          className="flex flex-row justify-between p-8"
          style={{ marginTop: insets.top, zIndex: 2, elevation: 2 }}
        >
          <SimpleIconButton
            icon={{ name: "close", color: "white" }}
            backGround="p-2 bg-[#ffffff22]"
            onPress={back}
          />

          <SimpleIconButton
            icon={{
              name: flash === "on" ? "flash" : "flash-off",
              color: "white",
            }}
            backGround="p-2 bg-[#ffffff22]"
            onPress={toggleFlash}
          />
        </View>

        <View
          style={{ marginBottom: insets.bottom }}
          className="p-8 flex-1 flex justify-end"
        >
          <View className="pb-8 flex flex-row items-center justify-around gap-8">
            <SimpleIconButton
              icon={{
                name: "camera-flip-outline",
                color: "white",
                size: 32,
              }}
              backGround="p-3 bg-[#ffffff22]"
              onPress={toggleCameraFacing}
            />

            <ShutterTrigger onPress={takePicture} />
            <View style={{ width: 56, height: 56 }}></View>
          </View>
        </View>
      </CameraView>
    </View>
  );
}
