import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BarcodeScanningResult,
  CameraType,
  CameraView,
  FlashMode,
  useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CCActionTypes } from "@/actions/CommandCenterActions";
import CameraPermissionScreen from "@/components/CameraPermissionScreen";
import QRTargetOverlay from "@/components/ui/QRTargetOverlay";
import ThemeButton from "@/components/ui/ThemeButton";
import useCommandCenter from "@/hooks/useCommandCenter";
import usePartyAuthContext from "@/hooks/usePartyAuthContext";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default function ScanScreen() {
  const [facing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [gotBarcode, setGotBarcode] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef<CameraView>(null);

  const { partyState } = usePartyAuthContext();

  const CC = useCommandCenter();

  useEffect(() => {
    console.log("Party Joining state ", partyState);

    if (gotBarcode && !partyState.isTryingToJoin) {
      console.log(" Results of join request are in ");

      if (partyState.isValidPartyId) {
        router.replace("/(root)/");
      }

      setGotBarcode(false);
    }
  }, [partyState, gotBarcode]);

  const insets = useSafeAreaInsets();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <CameraPermissionScreen requestPermission={requestPermission} />;
  }

  const toggleFlash = () => {
    setFlash((curr) => (curr === "off" ? "on" : "off"));
  };

  const fakeCode = async () => {
    if (partyState.isTryingToJoin) return;

    const fake: BarcodeScanningResult = {
      type: "qr",
      data: "P1234567890",
      raw: "P1234567890",
      bounds: {
        origin: { x: 0, y: 0 },
        size: { width: 10, height: 10 },
      },
      cornerPoints: [],
    };

    scannedBarcode(fake);
  };

  const back = () => {
    console.log("bak");
    router.back();
  };

  const scannedBarcode = (scanningResult: BarcodeScanningResult) => {
    if (partyState.isTryingToJoin) return;

    console.log(scanningResult);

    if (scanningResult.type === "qr") {
      setGotBarcode(true);

      CC.perform({
        type: CCActionTypes.TRY_JOIN_PARTY,
        payload: {
          partyId: scanningResult.data,
        },
      });
    }
  };

  return (
    <View className="flex-1 h-screen bg-black">
      <CameraView
        ref={cameraRef}
        style={{ width: winWidth, height: winHeight, zIndex: 0, elevation: 0 }}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scannedBarcode}
        className="flex-1 h-screen relative"
        facing={facing}
      >
        <QRTargetOverlay
          animated={!partyState.isTryingToJoin}
        ></QRTargetOverlay>

        <View
          className="flex flex-row justify-between p-8"
          style={{ marginTop: insets.top, zIndex: 2, elevation: 2 }}
        >
          <TouchableOpacity onPress={back}>
            <MaterialCommunityIcons color="white" name="close" size={24} />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleFlash}>
            <MaterialCommunityIcons
              size={24}
              color="white"
              name={flash === "on" ? "flash" : "flash-off"}
            />
          </TouchableOpacity>
        </View>

        {partyState.isTryingToJoin && (
          <ActivityIndicator
            size="large"
            className="absolute mx-auto my-auto"
            style={{
              top: winHeight / 2,
              left: winWidth / 2,
              transform: [{ translateX: -15 }, { translateY: -15 }],
            }}
          />
        )}

        <View
          style={{ marginBottom: insets.bottom }}
          className="p-8 flex-1 h-full justify-end"
        >
          <ThemeButton
            style={{ zIndex: 2, elevation: 2 }}
            title="Fake Test Code"
            onPress={fakeCode}
            className="mb-4"
          ></ThemeButton>
        </View>
      </CameraView>
    </View>
  );
}
