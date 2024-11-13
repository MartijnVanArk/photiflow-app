import { PixelRatio, TouchableOpacity } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

import { ShutterTriggerProps } from "@/types/type";

const ratio = PixelRatio.get();

const ShutterTrigger = ({
  className,
  color,
  ringColor,
  onPress,
}: ShutterTriggerProps) => {
  return (
    <TouchableOpacity onPress={onPress} className={` ${className}`}>
      <Svg viewBox="0 0 24 24" width={36 * ratio} height={36 * ratio}>
        <Path
          fill={ringColor ? ringColor : "#ffffff99"}
          d="M12,23.81C5.49,23.81.19,18.51.19,12S5.49.19,12,.19s11.81,5.3,11.81,11.81-5.3,11.81-11.81,11.81ZM12,1.19C6.04,1.19,1.19,6.04,1.19,12s4.85,10.81,10.81,10.81,10.81-4.85,10.81-10.81S17.96,1.19,12,1.19Z"
        />
        <Circle fill={color ? color : "#ffffff99"} cx="12" cy="12" r="10.11" />
      </Svg>
    </TouchableOpacity>
  );
};

export default ShutterTrigger;
