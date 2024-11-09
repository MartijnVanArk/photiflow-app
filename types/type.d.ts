import { StyleProp, TextInputProps, ViewStyle } from "react-native";

export interface ButtonIconProps {
  name?: string;
  size?: number;
  classes?: string;
  color?: string;
}

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "danger" | "outline" | "success";
  iconLeft?: ButtonIconProps;
  iconRight?: ButtonIconProps;
  className?: string;
  textSize?: string;
  rounding?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export interface ShutterTriggerProps extends TouchableOpacityProps {
  className?: string;
  onPress?: () => void;
}

declare interface InputControlProps extends TextInputProps {
  label?: string;
  icon?: ButtonIconProps;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}
