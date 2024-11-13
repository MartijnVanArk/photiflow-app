import { EventInfo, SourceInfo } from "./eventinfo";
import { DeviceInfoTagsDefaults } from "./systypes";

export type ImageTags = string[];

export type ImageExifData = Map<string, any>;

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

export interface ImageInfo {
  EventId: string;
  Event?: EventInfo;
  SourceId: string;
  Source?: SourceInfo;
  CreateDate: string;
  DateTime: string;
  Width: number;
  Height: number;
  Message: string;
  Preview: string;
  Tags: ImageTags;
}
