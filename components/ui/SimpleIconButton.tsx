import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { ButtonIconProps } from "@/types/type";

import ThemeText from "./ThemeText";

export interface SimpleIconButtonProps extends TouchableOpacityProps {
  icon: ButtonIconProps;
  backGround?: string;
  tag?: string;
  title?: string;
  onPressWithTag?: (tag: string) => void;
}

export default function SimpleIconButton({
  icon,
  backGround,
  className,
  tag,
  onPress,
  onPressWithTag,
  title,
  ...props
}: SimpleIconButtonProps) {
  const intPress = useCallback(() => {
    if (onPressWithTag) onPressWithTag(tag || "");
  }, [tag, onPressWithTag]);

  return (
    <TouchableOpacity
      {...props}
      onPress={onPress ? onPress : intPress}
      className={`flex flex-col items-center gap-2 rounded-full ${backGround} ${className}`}
    >
      <MaterialCommunityIcons
        // @ts-expect-error dynamic name for type
        name={icon.name}
        size={icon.size ?? 24}
        className={`${icon.classes}`}
        color={icon.color}
      />
      {title && (
        <ThemeText className="font-NunitoSemiBold text-md">{title}</ThemeText>
      )}
    </TouchableOpacity>
  );
}
