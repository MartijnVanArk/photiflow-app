import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { ButtonIconProps } from "@/types/type";

export interface SimpleIconButtonProps extends TouchableOpacityProps {
  icon: ButtonIconProps;
  backGround?: string;
  tag?: string;
  onPressWithTag?: (tag: string) => void;
}

export default function SimpleIconButton({
  icon,
  backGround,
  className,
  tag,
  onPress,
  onPressWithTag,
  ...props
}: SimpleIconButtonProps) {
  const intPress = useCallback(() => {
    if (onPressWithTag) onPressWithTag(tag || "");
  }, [tag, onPressWithTag]);

  return (
    <TouchableOpacity
      {...props}
      onPress={onPress ? onPress : intPress}
      className={`rounded-full ${backGround} ${className}`}
    >
      <MaterialCommunityIcons
        // @ts-expect-error dynamic name for type
        name={icon.name}
        size={icon.size ?? 24}
        className={`${icon.classes}`}
        color={icon.color}
      />
    </TouchableOpacity>
  );
}
