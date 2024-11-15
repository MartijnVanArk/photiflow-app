import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Text, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

export interface ThemeTextProps extends TextProps {
  texti18n?: string;
}

export default function ThemeText({
  children,
  className,
  texti18n,
  ...props
}: ThemeTextProps) {
  const { t } = useTranslation();

  const useClassName = useMemo(() => {
    return twMerge("font-Nunito text-lg text-textmain", className || "");
  }, [className]);

  return (
    <Text className={useClassName} {...props}>
      {texti18n && t(texti18n)}
      {children}
    </Text>
  );
}
