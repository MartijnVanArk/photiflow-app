import {
  BarcodeScanningResult,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MyButton from "@/components/ui/MyButton";
const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default function ScanScreen() {
  const [facing, _setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 gap-8 p-8 h-full justify-center items-center bg-light">
        <Text className="text-xl font-Nunito text-center text-textmain">
          We need your permission to show the camera
        </Text>
        <MyButton onPress={requestPermission} title="Grant permission" />
      </SafeAreaView>
    );
  }

  // function toggleCameraFacing() {
  //   setFacing((current) => (current === "back" ? "front" : "back"));
  // }

  const takePicture = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync();

    console.log(photo);
  };

  const back = () => {
    router.back();
  };

  const gotBarcode = (scanningResult: BarcodeScanningResult) => {
    console.log(scanningResult);
  };

  return (
    <View className="flex-1 h-screen bg-black">
      <CameraView
        ref={cameraRef}
        style={{ width: winWidth, height: winHeight }}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={gotBarcode}
        className="flex-1 h-screen"
        facing={facing}
      >
        <View className="p-8 flex-1 h-full justify-end">
          {/* <MyButton title="flip" onPress={toggleCameraFacing}></MyButton> */}
          <MyButton
            title="Picture"
            onPress={takePicture}
            className="mb-4"
          ></MyButton>
          <MyButton title="Back" onPress={back}></MyButton>
        </View>
      </CameraView>
    </View>
  );

  // return (
  //   <SafeAreaView>
  //     <View>
  //       <Text>Scannen</Text>
  //       <MyButton title="back" onPress={back}></MyButton>
  //     </View>
  //   </SafeAreaView>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
