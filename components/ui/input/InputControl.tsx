import { MaterialCommunityIcons } from "@expo/vector-icons";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";

import useTheme from "@/hooks/useTheme";
import { InputControlProps } from "@/types/type";

import ThemeText from "../themed/ThemeText";

const InputControl = forwardRef<TextInput, InputControlProps>(
  (
    {
      label,
      icon,
      secureTextEntry = false,
      labelStyle,
      containerStyle,
      inputStyle,
      iconStyle,
      className,
      placeholder,
      staticMode,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<TextInput>(null);
    const { getVarColor } = useTheme();

    useImperativeHandle(ref, () => inputRef.current as TextInput);

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <View className="my-2 w-full" accessible={false}>
          {label && (
            <ThemeText
              className={`text-textsecondary font-NunitoSemiBold mb-3 ${labelStyle}`}
            >
              {label}
            </ThemeText>
          )}
          <View
            accessible={false}
            className={`flex flex-row justify-start items-center relative bg-inputbg rounded-xl border border-overlay focus:border-overlay ${containerStyle}`}
          >
            {icon && icon.name && (
              <MaterialCommunityIcons
                // @ts-expect-error dynamic name for type
                name={icon.name}
                size={icon.size ?? 24}
                className="pl-5"
                color={icon.color || getVarColor("--color-primary-default")}
              />
            )}
            <TextInput
              ref={inputRef}
              cursorColor="black"
              placeholder={placeholder}
              placeholderTextColor="#999"
              className={`rounded-xl p-4 text-black font-NunitoSemiBold text-lg flex-1 ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  },
);

InputControl.displayName = "InputControl";

export default InputControl;
