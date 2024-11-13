import { CameraCapturedPicture } from "expo-camera";
import { ImagePickerResult } from "expo-image-picker";
import base64 from "react-native-base64";

import { ImageExifData, InternalImageData } from "@/types/pictureinfo";
import { EmptyDeviceTagInfo } from "@/types/systypes";
import { getMimeTypeFromExtension } from "@/utils/generic/mimetypes";

import { getDeviceInfoTagsDefault } from "./system/system";

export const encodeSafePicUri = (uri: string): string => {
  return base64.encode(uri);
};
export const decodeSafePicUri = (encoded: string): string => {
  return base64.decode(encoded);
};

export const emptyImage: InternalImageData = {
  width: 0,
  height: 0,
  base64: "",
  isValid: false,
  mime: "",
  exif: {},
  uri: "",
  wasUploaded: false,
  timeTaken: "",
  comment: "",
  tags: [],
  guest: {
    avatar: "",
    email: "",
    name: "",
    uid: "",
  },
  deviceTags: EmptyDeviceTagInfo,
};

export const makeDataUrl = (image: InternalImageData): string => {
  if (image.base64) return "data:" + image.mime + ";base64," + image.base64;
  return image.uri;
};

const inferMime = (fileuri: string): string => {
  const file = fileuri.split("/").pop();
  const ext = file?.split(".").pop();
  return getMimeTypeFromExtension(ext);
};

export const processCameraPicture = async (
  photo: CameraCapturedPicture,
): Promise<InternalImageData> => {
  return new Promise<InternalImageData>((resolve) => {
    const newExif: ImageExifData = {};

    if (photo.exif) {
      Object.keys(photo.exif).forEach((k) => (newExif[k] = photo.exif[k]));
    }

    resolve({
      width: photo.width,
      height: photo.height,
      base64: photo.base64 || "",
      isValid: true,
      uri: photo.uri,
      mime: inferMime(photo.uri),
      exif: newExif,
      wasUploaded: false,
      timeTaken: new Date().toISOString(),
      comment: "",
      tags: [],
      guest: {
        avatar: "",
        email: "",
        name: "",
        uid: "",
      },
      deviceTags: getDeviceInfoTagsDefault(),
    });
  });
};

export const processGalleryPicture = (
  photo: ImagePickerResult,
): Promise<InternalImageData> => {
  return new Promise<InternalImageData>((resolve) => {
    if (photo.assets && photo.assets.length > 0) {
      const pic = photo.assets[0];
      const mime = pic.mimeType ? pic.mimeType : inferMime(pic.uri);

      const newExif: ImageExifData = {};

      if (pic.exif) {
        Object.keys(pic.exif).forEach((k) => (newExif[k] = pic.exif![k]));
      }

      resolve({
        width: pic.width,
        height: pic.height,
        base64: pic.base64 || "",
        isValid: true,
        uri: pic.uri,
        mime: mime,
        exif: newExif,
        wasUploaded: false,
        timeTaken: new Date().toISOString(),
        comment: "",
        tags: [],
        guest: {
          avatar: "",
          email: "",
          name: "",
          uid: "",
        },
        deviceTags: getDeviceInfoTagsDefault(),
      });
    } else {
      resolve(emptyImage);
    }
  });
};

export const makeTransferSafeCCP = (
  photo: CameraCapturedPicture,
): CameraCapturedPicture => {
  photo.uri = base64.encode(photo.uri);
  return photo;
};

export const revertTransferSafeCCP = (
  photo: CameraCapturedPicture,
): CameraCapturedPicture => {
  photo.uri = base64.decode(photo.uri);
  return photo;
};
