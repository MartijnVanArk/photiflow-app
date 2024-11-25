import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Dimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CloseBackButton from "@/components/ui/CloseBackButton";
import PinIndicatorView from "@/components/ui/pin/PinIndicatorView";
import PinNumPad from "@/components/ui/pin/PinNumPad";
import ThemeStatusBar from "@/components/ui/themed/ThemeStatusBar";
import ThemeText from "@/components/ui/themed/ThemeText";
import { useNavigationCallback } from "@/hooks/useNavigationHelper";

const { width: winWidth } = Dimensions.get("window");

const pinLength = 6;

const EnterPinScreen = () => {
  const [pinCode, setPinCode] = useState("");
  const [padEnabled, setPadEnabled] = useState(true);
  const { t } = useTranslation();

  const params = useLocalSearchParams();
  const { returnpath, callbackHandle, title, message } = params;
  const { callback: pinValidator, cleanUpCallback } = useNavigationCallback(
    callbackHandle ? callbackHandle.toString() : "",
    false,
  );

  useEffect(() => {
    return () => {
      cleanUpCallback();
      setPinCode("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shakeX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (pinCode.length === pinLength) {
      const checkPin = async () => {
        setPadEnabled(false);

        const pinValid = pinValidator ? await pinValidator(pinCode) : false;

        if (pinValid) {
          if (returnpath) {
            router.back();
            setTimeout(() => {
              router.setParams({
                from: "enter-pin",
                pin: pinCode,
                pinValid: pinValid ? 1 : 0,
              });
            }, 10);
          } else {
            router.back();
          }
        } else {
          Animated.sequence([
            Animated.timing(shakeX, {
              toValue: -10,
              duration: 50,
              useNativeDriver: true,
            }),
            Animated.timing(shakeX, {
              toValue: 10,
              duration: 50,
              useNativeDriver: true,
            }),
            Animated.timing(shakeX, {
              toValue: -10,
              duration: 50,
              useNativeDriver: true,
            }),
            Animated.timing(shakeX, {
              toValue: 10,
              duration: 50,
              useNativeDriver: true,
            }),
            Animated.timing(shakeX, {
              toValue: -10,
              duration: 50,
              useNativeDriver: true,
            }),
            Animated.timing(shakeX, {
              toValue: 10,
              duration: 50,
              useNativeDriver: true,
            }),
            Animated.timing(shakeX, {
              toValue: 0,
              duration: 50,
              useNativeDriver: true,
            }),
          ]).start();

          setPinCode("");
        }

        setPadEnabled(true);
      };

      checkPin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinCode]);

  return (
    <View className="flex-1 bg-light relative">
      <View
        className="absolute bg-primary"
        style={{
          borderRadius: winWidth * 4,
          left: -winWidth * 2,
          top: -winWidth * 4,
          width: winWidth * 5,
          height: winWidth * 5,
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <ThemeStatusBar />
        <View
          className=" h-full
          flex justify-between"
        >
          <View className=" flex-1 gap-4 items-center justify-center">
            <ThemeText className="text-3xl text-white">
              {title ? title : t("enter-pin-title")}
            </ThemeText>
            <ThemeText className=" text-white">
              {message ? message : t("enter-pin-message")}
            </ThemeText>
            <PinIndicatorView
              style={{ transform: [{ translateX: shakeX }] }}
              code={pinCode}
            />
            <ThemeText className=" text-white">
              {t("enter-pin-enter-pin")}
            </ThemeText>
          </View>
          <PinNumPad
            padEnabled={padEnabled}
            code={pinCode}
            setCode={setPinCode}
            wantLength={pinLength}
            className="flex-1 flex items-center justify-center"
          ></PinNumPad>
        </View>
      </SafeAreaView>
      <CloseBackButton />
    </View>
  );
}; // end of EnterPinScreen

export default EnterPinScreen;
