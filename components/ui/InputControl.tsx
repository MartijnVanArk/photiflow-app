import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import useTheme from "@/hooks/useTheme";
import { InputControlProps } from "@/types/type";

const InputControl = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  placeholder,
  ...props
}: InputControlProps) => {
  const inputRef = useRef<TextInput>(null);
  const { getVarColor } = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          {label && (
            <Text
              className={`text-lg text-textsecondary font-NunitoSemiBold mb-3 ${labelStyle}`}
            >
              {label}
            </Text>
          )}
          <View
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
              placeholder={placeholder}
              className={`rounded-xl p-4 text-black font-NunitoSemiBold text-[16px] flex-1 ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputControl;
