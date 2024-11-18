import {
  BarcodeScanningResult,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Dimensions, ActivityIndicator, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CCActionTypes } from "@/actions/CommandCenterActions";
import CameraPermissionScreen from "@/components/fragments/CameraPermissionScreen";
import CloseBackButton from "@/components/ui/CloseBackButton";
import QRTargetOverlay from "@/components/ui/qr/QRTargetOverlay";
import SimpleIconButton from "@/components/ui/SimpleIconButton";
import ThemeBasicButton from "@/components/ui/themed/ThemeBasicButton";
import ThemeStatusBar from "@/components/ui/themed/ThemeStatusBar";
import useCommandCenter from "@/hooks/useCommandCenter";
import useEventAuthContext from "@/hooks/useEventAuthContext";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default function ScanScreen() {
  const [facing] = useState<CameraType>("back");

  const [gotBarcode, setGotBarcode] = useState(false);

  const [torch, setTorch] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef<CameraView>(null);

  const { EventState } = useEventAuthContext();

  const CC = useCommandCenter();
  const { t } = useTranslation();

  useEffect(() => {
    if (gotBarcode && !EventState.isTryingToJoin) {
      if (EventState.isValidEventId) {
        router.replace("/(root)/EventScreen");
      } else {
        Alert.alert(
          t("scan-invalidevent-title"),
          t("scan-invalidevent-message"),
        );
      }

      setGotBarcode(false);
    }
  }, [EventState, gotBarcode, t]);

  const insets = useSafeAreaInsets();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <CameraPermissionScreen requestPermission={requestPermission} />;
  }

  const toggleTorch = () => {
    setTorch((torch) => !torch);
  };

  const fakeCode = async () => {
    if (EventState.isTryingToJoin) return;

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

  const scannedBarcode = (scanningResult: BarcodeScanningResult) => {
    if (EventState.isTryingToJoin) return;

    setGotBarcode(true);

    CC.perform({
      type: CCActionTypes.TRY_JOIN_EVENT,
      payload: {
        EventId: scanningResult.data,
      },
    });
  };

  return (
    <View className="flex-1 h-screen bg-black">
      <ThemeStatusBar hidden={false} backgroundColor="transparent" />
      <CameraView
        enableTorch={torch}
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
          animated={!EventState.isTryingToJoin}
        ></QRTargetOverlay>

        <View
          className="flex flex-row justify-between p-8"
          style={{ marginTop: insets.top, zIndex: 2, elevation: 2 }}
        >
          <CloseBackButton noAbsolute={true} />

          <SimpleIconButton
            icon={{
              name: torch ? "flashlight-off" : "flashlight",
              color: "white",
            }}
            backGround="p-2 bg-[#00000044]"
            onPress={toggleTorch}
          />
        </View>

        {EventState.isTryingToJoin && (
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
          <ThemeBasicButton
            style={{ zIndex: 2, elevation: 2 }}
            title="Debug with Fake Test Code"
            onPress={fakeCode}
            className="mb-4"
          />
        </View>
      </CameraView>
    </View>
  );
}
