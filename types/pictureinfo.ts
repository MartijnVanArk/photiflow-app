import { PartyInfo, SourceInfo } from "./partyinfo";

export type ImageTags = Map<string, string>;

export type BasicImageData = {
  isValid: boolean;
  width: number;
  height: number;
  base64: string;
  mime: string;
  uri: string;
  wasUploaded: boolean;
  timeTaken: string;
};

export interface ImageInfo {
  PartyId: string;
  Party?: PartyInfo;
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
