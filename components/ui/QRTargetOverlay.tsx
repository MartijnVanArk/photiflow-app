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
        Animated.spring(pulseValue, {
          toValue: 1.05,
          useNativeDriver: true,
        }),
        Animated.spring(pulseValue, {
          toValue: 1,
          useNativeDriver: true,
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
      <Animated.View id="frame" style={[pulseStyle, { opacity: 0.5 }]}>
        <QRTarget thickNess={12} />
      </Animated.View>

      {children}
    </View>
  );
};

export default QRTargetOverlay;
