import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  CameraType,
  CameraView,
  FlashMode,
  useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Alert, Dimensions, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CCActionTypes } from "@/actions/CommandCenterActions";
import CameraPermissionScreen from "@/components/CameraPermissionScreen";
import ShutterTrigger from "@/components/ui/ShutterTrigger";
import useCommandCenter from "@/hooks/useCommandCenter";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default function TakePictureScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");

  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef<CameraView>(null);

  const insets = useSafeAreaInsets();

  const CC = useCommandCenter();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <CameraPermissionScreen requestPermission={requestPermission} />;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();

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
          "Error Taking Picture",
          "Somethinig went wrong while taking your picture",
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
          <TouchableOpacity
            onPress={back}
            className="blur-sm bg-[#ffffff22] p-2 rounded-full"
          >
            <MaterialCommunityIcons color="white" name="close" size={24} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={toggleFlash}
            className="blur-sm bg-[#ffffff22] p-2 rounded-full"
          >
            <MaterialCommunityIcons
              size={24}
              color="white"
              name={flash === "on" ? "flash" : "flash-off"}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{ marginBottom: insets.bottom }}
          className="p-8 flex-1 flex justify-end"
        >
          <View className="pb-8 flex flex-row items-center justify-around gap-8">
            <TouchableOpacity
              onPress={toggleCameraFacing}
              className="blur-sm bg-[#ffffff22] p-2 rounded-full"
            >
              <MaterialCommunityIcons
                name="camera-flip-outline"
                color="white"
                size={32}
              />
            </TouchableOpacity>
            <ShutterTrigger onPress={takePicture} />
            <View style={{ width: 48, height: 48 }}></View>
          </View>
        </View>
      </CameraView>
    </View>
  );
}
