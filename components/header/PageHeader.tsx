import { router } from "expo-router";
import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();

    const useHeight = height !== undefined ? height : "auto";

    console.log("Header got LC : ", leftClick);

    return (
      <View
        ref={ref}
        className="bg-primary overflow-hidden flex flex-row justify- items-center"
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
              icon={{ name: "arrow-left", color: "white" }}
              onPress={() => (leftClick ? leftClick() : router.back())}
            />
          )}
        </View>
        <View className="flex-1 items-center">
          <ThemeText className="font-NunitoSemiBold text-2xl text-white">
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
