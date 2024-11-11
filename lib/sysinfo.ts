import DeviceInfo from "react-native-device-info";

export type DeviceInfoType = {
  id: string;
  type: string;
};

export const getDeviceInfo = (): DeviceInfoType => {
  return {
    id: DeviceInfo.getDeviceId(),
    type: DeviceInfo.getDeviceType(),
  };
};
