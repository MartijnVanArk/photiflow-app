import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

import useTheme from "@/hooks/useTheme";
import { ButtonIconProps } from "@/types/type";

import ThemeText from "./themed/ThemeText";

export interface ThemeIconTitleProps extends ViewProps {
  icon?: ButtonIconProps;
  title?: string;
  titlei18n?: string;
  color?: string;
}

export default function ThemeIconTitle({
  icon,
  title,
  color,
  className,
  ...props
}: ThemeIconTitleProps) {
  const { getVarColor } = useTheme();
  const { t } = useTranslation();
  return (
    <View
      className={twMerge(className, "flex-row items-center gap-2 py-2 px-4")}
      {...props}
    >
      {icon && (
        <MaterialCommunityIcons
          //@ts-expect-error forced icon name
          name={icon.name}
          size={icon.size}
          color={
            icon.color ? icon.color : getVarColor("--color-primary-default")
          }
        />
      )}
      <ThemeText className={twMerge("text-center font-NunitoSemiBold", color)}>
        {title ? title : t(props.titlei18n || "")}
      </ThemeText>
    </View>
  );
}
