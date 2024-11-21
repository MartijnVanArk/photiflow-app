import { router } from "expo-router";
import React, { forwardRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import useTheme from "@/hooks/useTheme";

import SimpleIconButton from "../ui/SimpleIconButton";
import ThemeText from "../ui/themed/ThemeText";

export interface PageHeaderProps extends ViewProps {
  handleInset?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  height?: number;
  title?: string;
  titlei18n?: string;
  leftClick?: () => void;
  variant?: "primary" | "transparent";
}

const PageHeader = forwardRef<View, PageHeaderProps>(
  (
    {
      handleInset = true,
      style,
      left,
      right,
      height,
      title,
      titlei18n,
      leftClick,
      variant = "primary",
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();

    const useHeight = height !== undefined ? height : "auto";

    const { getVarColor } = useTheme();

    const { bgColor, textColor, iconColor } = useMemo(() => {
      switch (variant) {
        case "primary":
          return {
            bgColor: "bg-primary",
            textColor: "text-white",
            iconColor: "white",
          };
        case "transparent":
          return {
            bgColor: "bg-transparent",
            textColor: "text-maintext",
            iconColor: getVarColor("--color-textmain"),
          };
        default:
          return {
            bgColor: "bg-primary",
            textColor: "text-white",
            iconColor: "white",
          };
      }
    }, [getVarColor, variant]);

    return (
      <View
        ref={ref}
        className={`${bgColor} overflow-hidden flex flex-row justify- items-center`}
        style={[
          {
            height: useHeight,
            marginTop: handleInset ? insets.top : 0,
          },
          style,
        ]}
        {...props}
      >
        <View className="p-4  ">
          {left ? (
            left
          ) : (
            <SimpleIconButton
              icon={{ name: "arrow-left", color: iconColor }}
              onPress={() => (leftClick ? leftClick() : router.back())}
            />
          )}
        </View>
        <View className="flex-1 items-center">
          <ThemeText className={`font-NunitoSemiBold text-2xl ${textColor}`}>
            {titlei18n ? t(titlei18n) : title}
          </ThemeText>
        </View>
        <View className="w-16  items-center">{right ? right : null}</View>
      </View>
    );
  },
);

PageHeader.displayName = "PageHeader";

export default PageHeader;
