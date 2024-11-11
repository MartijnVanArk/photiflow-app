import { CameraCapturedPicture } from "expo-camera";
// import * as FileSystem from "expo-file-system";
import { ImagePickerResult } from "expo-image-picker";
import base64 from "react-native-base64";

import { InternalImageData } from "@/types/pictureinfo";
import { getMimeTypeFromExtension } from "@/utils/mimetypes";

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
  exif: new Map<string, any>(),
  uri: "",
  wasUploaded: false,
  timeTaken: "",
  comment: "",
  tags: new Map<string, string>(),
  guest: {
    avatar: "",
    email: "",
    name: "",
  },
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
    const newExif = new Map<string, any>();

    if (photo.exif) {
      Object.keys(photo.exif).forEach((k) => newExif.set(k, photo.exif[k]));
    }
    console.log("New EXIF : ", newExif);

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
      tags: new Map<string, string>(),
      guest: {
        avatar: "",
        email: "",
        name: "",
      },
    });

    // FileSystem.readAsStringAsync(photo.uri, { encoding: "base64" })
    //   .then((base64) =>
    //     resolve({
    //       width: photo.width,
    //       height: photo.height,
    //       base64: base64,
    //       isValid: true,
    //       uri: photo.uri,
    //       mime: inferMime(photo.uri),
    //       wasUploaded: false,
    //       timeTaken: new Date().toISOString(),
    //     }),
    //   )
    //   .catch(() => resolve(emptyImage));
  });
};

export const processGalleryPicture = (
  photo: ImagePickerResult,
): Promise<InternalImageData> => {
  return new Promise<InternalImageData>((resolve) => {
    if (photo.assets && photo.assets.length > 0) {
      const pic = photo.assets[0];
      const mime = pic.mimeType ? pic.mimeType : inferMime(pic.uri);

      const newExif = new Map<string, any>();

      if (pic.exif) {
        Object.keys(pic.exif).forEach((k) => newExif.set(k, pic.exif![k]));
      }

      console.log("New EXIF : ", newExif);

      //      if (pic.base64) {
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
        tags: new Map<string, string>(),
        guest: {
          avatar: "",
          email: "",
          name: "",
        },
      });
      //      }

      // FileSystem.readAsStringAsync(pic.uri, { encoding: "base64" })
      //   .then((base64) =>
      //     resolve({
      //       width: pic.width,
      //       height: pic.height,
      //       base64: base64,
      //       isValid: true,
      //       uri: pic.uri,
      //       mime: mime,
      //       wasUploaded: false,
      //       timeTaken: new Date().toISOString(),
      //     }),
      //   )
      //   .catch(() => {
      //     resolve(emptyImage);
      //   });
    } else {
      resolve(emptyImage);
    }
  });
};
