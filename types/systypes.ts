export type DeviceInfoTags = "device:os" | "device:type" | "device:name";

export const EmptyDeviceTagInfo: DeviceInfoTagsDefaults = {
  os: "",
  type: "",
  model: "",
  name: "",
};

export type DeviceInfoTagsDefaults = {
  os: string;
  type: string;
  model: string;
  name: string;
};
