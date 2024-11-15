import { View, ViewProps, PixelRatio, Animated } from "react-native";

import PinIndicatorDot from "./PinIndicatorDot";

export interface PinIndicatorViewProps extends ViewProps {
  pinLength?: number;
  code: string;
  borderColor?: string;
  fillColor?: string;
  emptyBackgroundColor?: string;
}

const ratio = PixelRatio.get();

export default function PinIndicatorView({
  pinLength = 6,
  code,
  borderColor = "transparent",
  emptyBackgroundColor = "#ffffff33",
  fillColor = "white",
  ...props
}: PinIndicatorViewProps) {
  return (
    <Animated.View className="flex flex-row gap-2" {...props}>
      {Array(pinLength)
        .fill(0)
        .map((_, idx) => {
          return (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderColor: borderColor,
                backgroundColor: emptyBackgroundColor,
                borderWidth: 2,
                borderRadius: 16 * ratio,
                width: 16 * ratio,
                height: 16 * ratio,
              }}
            >
              <PinIndicatorDot isOn={idx < code.length} bgColor={fillColor} />
            </View>
          );
        })}
    </Animated.View>
  );
}
