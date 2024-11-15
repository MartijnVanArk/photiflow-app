import Svg, { Path } from "react-native-svg";

export type QRTargetProps = {
  thickNess?: number;
};

const QRTarget = ({ thickNess = 32 }: QRTargetProps) => {
  return (
    <Svg viewBox="0 0 512 512">
      <Path // bottom right
        d="M336,448h56a56,56,0,0,0,56-56V336"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={thickNess}
      />
      <Path // top right
        d="M448,176V120a56,56,0,0,0-56-56H336"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={thickNess}
      />
      <Path // bottom left
        d="M176,448H120a56,56,0,0,1-56-56V336"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={thickNess}
      />
      <Path // top left
        d="M64,176V120a56,56,0,0,1,56-56h56"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={thickNess}
      />
    </Svg>
  );
};

export default QRTarget;
