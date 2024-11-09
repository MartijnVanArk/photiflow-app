import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";

import useTheme from "@/hooks/useTheme";
import { ButtonIconProps, ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["variant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-400";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-primary border-[1px]";

    default:
      return "bg-primary";
  }
};

const getIconVariantStyle = (variant: ButtonIconProps["color"]) => {
  switch (variant) {
    case "secondary":
      return "--color-slate-default";
    case "danger":
      return "#660000";
    case "success":
      return "#006600";
    case "outline":
      return "--color-primary-default";
    default:
      return "white";
  }
};

const getTextVariantStyle = (variant: ButtonProps["variant"]) => {
  switch (variant) {
    case "outline":
      return "text-primary";
    case "primary":
      return "text-white";
    case "secondary":
      return "text-gray-700";
    case "danger":
      return "text-red-950";
    case "success":
      return "text-green-900";
    default:
      return "text-white";
  }
};

const ThemeButton = ({
  onPress,
  title,
  variant = "primary",
  textSize = "text-lg",
  className,
  iconLeft = { size: 24 },
  iconRight = { size: 24 },
  style,
  ...props
}: ButtonProps) => {
  const { getVarColor } = useTheme();

  const procColor = (c: string): string => {
    if (c.startsWith("--")) return getVarColor(c);
    return c;
  };

  const useTextVariant = procColor(getTextVariantStyle(variant));
  const useBgVariant = getBgVariantStyle(variant);
  const iconVariant = procColor(getIconVariantStyle(variant));

  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      className={`rounded-xl p-3 flex flex-row justify-center items-center ${useBgVariant} ${className}`}
      {...props}
    >
      {iconLeft && iconLeft.name && (
        <MaterialCommunityIcons
          // @ts-expect-error dynamic name for type
          name={iconLeft.name}
          size={iconLeft.size ?? 24}
          className={`${title ? "pr-2" : ""} ${useTextVariant} ${iconLeft.classes}`}
          color={iconVariant} //{useTextVariant ?? iconLeft.color}
        />
      )}

      {/* {IconLeft && <IconLeft className="text-dark" />} */}
      {title && (
        <Text className={`${textSize} font-NunitoBold ${useTextVariant}`}>
          {title}
        </Text>
      )}

      {iconRight && iconRight.name && (
        <MaterialCommunityIcons
          // @ts-expect-error dynamic name for type
          name={iconRight.name}
          size={iconRight.size ?? 24}
          className={`${title ? "pl-2" : ""} ${useTextVariant} ${iconRight.classes}`}
          color={iconVariant} //{useTextVariant ?? iconLeft.color}
        />
      )}

      {/* {IconRight && <IconRight />} */}
    </TouchableOpacity>
  );
};

export default ThemeButton;
