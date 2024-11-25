import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import useTheme from "@/hooks/useTheme";
import { ButtonBasicProps, ButtonIconProps, ButtonProps } from "@/types/type";

import ThemeText from "./ThemeText";

const getBgVariantStyle = (variant: ButtonProps["variant"], _theme: string) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-400";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-primary border-[1px]";
    case "accent":
      return "bg-secondary";
    case "tertiary":
      return "bg-tertiary";
    default:
      return "bg-primary";
  }
};

const getIconVariantStyle = (
  variant: ButtonIconProps["color"],
  _theme: string,
) => {
  switch (variant) {
    case "secondary":
    case "tertiary":
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

const getTextVariantStyle = (
  variant: ButtonProps["variant"],
  _theme: string,
) => {
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
    case "tertiary":
      return "text-slate-800";
    default:
      return "text-white";
  }
};

const ThemeBasicButton = ({
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  title,
  subtitle,
  variant = "primary",
  textSize = "text-xl",
  className,
  iconLeft = { size: 24 },
  iconRight = { size: 24 },
  style,
  disabled,
  rounded = "rounded-xl",
  outerClassName,
  ...props
}: ButtonBasicProps) => {
  const { theme, getVarColor } = useTheme();

  const scale = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scale.setValue(1);
    overlayOpacity.setValue(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const procColor = useCallback(
    (c: string): string => {
      if (c.startsWith("--")) return getVarColor(c);
      return c;
    },
    [getVarColor],
  );

  const { useTextVariant, useBgVariant, iconVariant } = useMemo(() => {
    return {
      useTextVariant: procColor(getTextVariantStyle(variant, theme || "light")),
      useBgVariant: getBgVariantStyle(variant, theme || "light"),
      iconVariant: procColor(getIconVariantStyle(variant, theme || "light")),
    };
  }, [procColor, variant, theme]);

  const internalPressIn = useCallback(
    (event: GestureResponderEvent) => {
      Animated.timing(overlayOpacity, {
        toValue: 0.2,
        duration: 100,
        useNativeDriver: true,
      }).start();

      if (onPressIn) onPressIn(event);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onPressIn],
  );

  const internalPressOut = useCallback(
    (event: GestureResponderEvent) => {
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();

      if (onPressOut) onPressOut(event);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onPressOut],
  );

  const internalPress = useCallback(
    (event: GestureResponderEvent) => {
      scale.setValue(0.93);
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 20,
        speed: 20,
      }).start();

      if (onPress) onPress();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onPress],
  );

  return (
    <Animated.View
      className={`${outerClassName}`}
      style={{ transform: [{ scale: scale }] }}
    >
      <Pressable
        style={[style, { opacity: disabled ? 0.4 : 1 }]}
        disabled={disabled}
        onPress={internalPress}
        className={`${rounded} relative p-4 flex flex-row gap-2 justify-center items-center overflow-hidden ${useBgVariant} ${className}`}
        {...props}
        onLongPress={onLongPress}
        onPressIn={internalPressIn}
        onPressOut={internalPressOut}
      >
        {iconLeft && iconLeft.name && (
          <MaterialCommunityIcons
            // @ts-expect-error dynamic name for type
            name={iconLeft.name}
            size={iconLeft.size ?? 24}
            className={`${title ? "pr-2" : ""} ${useTextVariant} ${iconLeft.classes}`}
            color={iconVariant}
          />
        )}

        {(title || subtitle) && (
          <View className="flex items-center">
            {title && (
              <ThemeText
                className={`${textSize} font-NunitoSemiBold ${useTextVariant}`}
              >
                {title}
              </ThemeText>
            )}
            {subtitle && (
              <ThemeText className={useTextVariant} style={{ opacity: 0.8 }}>
                {subtitle}
              </ThemeText>
            )}
          </View>
        )}

        {iconRight && iconRight.name && (
          <MaterialCommunityIcons
            // @ts-expect-error dynamic name for type
            name={iconRight.name}
            size={iconRight.size ?? 24}
            className={`${title ? "pl-2" : ""} ${useTextVariant} ${iconRight.classes}`}
            color={iconVariant}
          />
        )}

        <Animated.View
          className="absolute top-0 left-0 right-0 bottom-0 "
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: "#000", opacity: overlayOpacity },
          ]}
        />
      </Pressable>
    </Animated.View>
  );
};

export default ThemeBasicButton;
