import { router, useLocalSearchParams } from "expo-router";
import React, { createRef, useRef, useState } from "react";
import { Animated, PixelRatio, View } from "react-native";
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
  State,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import SimpleIconButton from "@/components/ui/SimpleIconButton";
import { decodeSafePicUri } from "@/lib/pictureprocessing";

const SinglePictureViewer = () => {
  const params = useLocalSearchParams();

  const [panEnabled, setPanEnabled] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const pinchRef = createRef();
  const panRef = createRef();

  const onPinchEvent = Animated.event([{ nativeEvent: { scale } }], {
    useNativeDriver: true,
  });

  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const handlePinchStateChange = ({
    nativeEvent,
  }: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>) => {
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }

    const nScale = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        setPanEnabled(false);
      }
    }
  };

  const picUri = decodeSafePicUri(params.picture.toString() || "");

  const inset = useSafeAreaInsets();
  const ratio = PixelRatio.get();

  console.log("scale : ", scale, " TX ", translateX, " TY ", translateY);

  return (
    <View className="bg-black  w-screen h-screen flex relative">
      <PanGestureHandler
        onGestureEvent={onPanEvent}
        ref={panRef}
        simultaneousHandlers={pinchRef}
        enabled={panEnabled}
        failOffsetX={[-1000, 1000]}
        shouldCancelWhenOutside
      >
        <Animated.View>
          <PinchGestureHandler
            ref={pinchRef}
            onGestureEvent={onPinchEvent}
            simultaneousHandlers={panRef}
            onHandlerStateChange={handlePinchStateChange}
          >
            <Animated.Image
              resizeMode="contain"
              source={{
                uri: picUri,
              }}
              style={{
                width: "100%",
                height: "100%",
                transform: [
                  { scale: scale },
                  { translateX: translateX },
                  { translateY: translateY },
                ],
              }}
            />
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
      <SimpleIconButton
        onPress={() => router.back()}
        icon={{ name: "close", color: "white" }}
        backGround="bg-[#ffffff22]"
        className="absolute"
        style={{ top: inset.top + 8 * ratio, left: 8 * ratio }}
      />
    </View>
  );
};

export default SinglePictureViewer;
