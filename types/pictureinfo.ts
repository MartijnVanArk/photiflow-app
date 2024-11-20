//import { EventInfo, SourceInfo } from "./eventinfo";
import { DeviceInfoTagsDefaults } from "./systypes";

export type ImageTags = string[];

export type ImageExifData = { [key: string]: any };

export type InternalImageData = {
  isValid: boolean;
  width: number;
  height: number;
  base64: string;
  mime: string;
  uri: string;
  wasUploaded: boolean;
  timeTaken: string;
  guest: {
    name: string;
    email: string;
    avatar: string;
    uid: string;
  };
  deviceTags: DeviceInfoTagsDefaults;
  comment: string;
  tags: ImageTags;
  exif: ImageExifData;
};
