import {
  PressableProps,
  StyleProp,
  TextInputProps,
  ViewStyle,
} from "react-native";

export interface ButtonIconProps {
  name?: string;
  size?: number;
  classes?: string;
  color?: string;
}

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  subtitle?: string;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "outline"
    | "success"
    | "accent"
    | "tertiary";
  iconLeft?: ButtonIconProps;
  iconRight?: ButtonIconProps;
  className?: string;
  textSize?: string;
  rounding?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  rounded?: string;
  tag?: string;
  onPress?: () => void;
}

export interface ButtonBasicProps extends PressableProps {
  title?: string;
  subtitle?: string;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "outline"
    | "success"
    | "accent"
    | "tertiary";
  iconLeft?: ButtonIconProps;
  iconRight?: ButtonIconProps;
  className?: string;
  textSize?: string;
  rounding?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  rounded?: string;
  tag?: string;
  onPress?: () => void;
}

export interface ShutterTriggerProps extends TouchableOpacityProps {
  className?: string;
  color?: string;
  ringColor?: string;
  onPress?: () => void;
}

export interface InputControlProps extends TextInputProps {
  label?: string;
  icon?: ButtonIconProps;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

export interface TagInputProps extends InputControlProps {
  tags: string[];
  triggerKeys?: string[];
  onNewTags?: (tags: string[]) => void;
}

export interface TagInputTagProps {
  tag: string;
  onDelete: (tag: string) => void;
}
