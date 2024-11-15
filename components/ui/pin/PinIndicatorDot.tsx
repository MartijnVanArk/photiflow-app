import { useEffect, useRef } from "react";
import { Animated, ViewProps } from "react-native";

export interface PinIndicatorDotProps extends ViewProps {
  isOn: boolean;
  bgColor?: string;
}
export default function PinIndicatorDot({
  isOn,
  bgColor,
  ...props
}: PinIndicatorDotProps) {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      bounciness: 5,
      toValue: isOn ? 1 : 0,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOn]);

  return (
    <Animated.View
      {...props}
      style={{
        transform: [{ scale: scale }],
        backgroundColor: bgColor,
        width: "80%",
        height: "80%",
        borderRadius: "100%",
      }}
    />
  );
}
