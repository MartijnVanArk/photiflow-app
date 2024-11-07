export interface ButtonIconProps {
  name?: string;
  size?: number;
  classes?: string;
  color?: string;
}

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  iconLeft?: ButtonIconProps;
  iconRight?: ButtonIconProps;
  className?: string;
  textSize?: string;
  rounding?: string;
  onPress?: () => void;
}
