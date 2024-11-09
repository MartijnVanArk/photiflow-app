import { PropsWithChildren, useEffect, useRef } from "react";
import { Animated, Dimensions, PixelRatio, View } from "react-native";

import QRTarget from "./QRTarget";

const { width: winWidth, height: winHeight } = Dimensions.get("window");
const ratio = PixelRatio.get();
const padding = 0 * ratio;
const minDim = Math.min(winWidth, winHeight) - padding * 2;
const hOff = (winHeight - minDim) / 2;
const wOff = (winWidth - minDim) / 2;

export interface QRTargetOverlayProps extends PropsWithChildren {
  animated?: boolean;
}

const QRTargetOverlay = ({
  children,
  animated = true,
}: QRTargetOverlayProps) => {
  const pulseValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.05,
          duration: 600,
          useNativeDriver: true,
          //          easing: Easing.inOut(Easing.elastic(1)),
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
          //          easing: Easing.inOut(Easing.elastic(1)),
        }),
      ]),
    ).start();
  }, [pulseValue]);

  const pulseStyle = {
    left: wOff,
    top: hOff,
    width: minDim,
    height: minDim,
    transform: [{ scale: animated ? pulseValue : 1 }],
  };

  return (
    <View
      style={{ zIndex: 0, elevation: 0 }}
      className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none"
    >
      {/* <View
        id="top"
        className="absolute bg-black opacity-[0.5] top-0 right-0 left-0"
        style={{ height: hOff }}
      ></View>
      <View
        id="bottom"
        className="absolute bg-black opacity-[0.5] bottom-0 right-0 left-0"
        style={{ top: hOff + minDim }}
      >
        {children}
      </View>
      <View
        id="left"
        className="absolute bg-black opacity-[0.5] left-0"
        style={{ top: hOff, height: minDim, width: wOff }}
      ></View>
      <View
        id="right"
        className="absolute bg-black opacity-[0.5] right-0"
        style={{ left: wOff + minDim, width: wOff, height: minDim, top: hOff }}
      ></View> */}
      <Animated.View
        id="frame"
        // className="absolute border-lime-500 border-4 rounded-lg"
        style={pulseStyle}
      >
        <QRTarget thickNess={12} />
      </Animated.View>

      {children}
    </View>
  );
};

export default QRTargetOverlay;
