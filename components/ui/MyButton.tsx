import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";

import useTheme from "@/hooks/useTheme";
import { ButtonIconProps, ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";

    default:
      return "bg-primary";
  }
};

const getIconVariantStyle = (variant: ButtonIconProps["color"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";

    default:
      return "--color-text-primary";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-dark";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};

const MyButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  textSize = "text-lg",
  IconLeft,
  IconRight,
  className,
  iconLeft = { size: 24 },
  ...props
}: ButtonProps) => {
  const { getVarColor } = useTheme();

  const useTextVariant = getTextVariantStyle(textVariant);
  const useBgVariant = getBgVariantStyle(bgVariant);
  const iconVariant = getVarColor(getIconVariantStyle(textVariant));

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full  rounded-xl p-3 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${useBgVariant} ${className}`}
      {...props}
    >
      {iconLeft && iconLeft.name && (
        <MaterialCommunityIcons
          // @ts-expect-error dynamic name for type
          name={iconLeft.name}
          size={iconLeft.size ?? 24}
          className={`pr-2 ${useTextVariant} ${iconLeft.classes}`}
          color={iconVariant} //{useTextVariant ?? iconLeft.color}
        />
      )}

      {/* {IconLeft && <IconLeft className="text-dark" />} */}
      <Text className={`${textSize} font-NunitoBold ${useTextVariant}`}>
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default MyButton;
