import { CameraCapturedPicture } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { ImagePickerResult } from "expo-image-picker";

import { BasicImageData } from "@/types/pictureinfo";

export const emptyImage: BasicImageData = {
  width: 0,
  height: 0,
  base64: "",
  isValid: false,
  mime: "",
  uri: "",
  wasUploaded: false,
  timeTaken: "",
};

const inferMime = (uri: string): string => {
  return "";
};

export const processCameraPicture = async (
  photo: CameraCapturedPicture,
): Promise<BasicImageData> => {
  return new Promise<BasicImageData>((resolve) => {
    if (photo.base64) {
      resolve({
        width: photo.width,
        height: photo.height,
        base64: photo.base64,
        isValid: true,
        uri: photo.uri,
        mime: inferMime(photo.uri),
        wasUploaded: false,
        timeTaken: new Date().toDateString(),
      });
    }

    FileSystem.readAsStringAsync(photo.uri, { encoding: "base64" })
      .then((base64) =>
        resolve({
          width: photo.width,
          height: photo.height,
          base64: base64,
          isValid: true,
          uri: photo.uri,
          mime: inferMime(photo.uri),
          wasUploaded: false,
          timeTaken: new Date().toDateString(),
        }),
      )
      .catch(() => resolve(emptyImage));
  });
};

export const processGalleryPicture = (
  photo: ImagePickerResult,
): Promise<BasicImageData> => {
  return new Promise<BasicImageData>((resolve) => {
    if (photo.assets && photo.assets.length > 0) {
      const pic = photo.assets[0];
      const mime = pic.mimeType ? pic.mimeType : inferMime(pic.uri);

      if (pic.base64) {
        resolve({
          width: pic.width,
          height: pic.height,
          base64: pic.base64,
          isValid: true,
          uri: pic.uri,
          mime: mime,
          wasUploaded: false,
          timeTaken: new Date().toDateString(),
        });
      }

      FileSystem.readAsStringAsync(pic.uri, { encoding: "base64" })
        .then((base64) =>
          resolve({
            width: pic.width,
            height: pic.height,
            base64: base64,
            isValid: true,
            uri: pic.uri,
            mime: mime,
            wasUploaded: false,
            timeTaken: new Date().toDateString(),
          }),
        )
        .catch(() => {
          resolve(emptyImage);
        });
    } else {
      resolve(emptyImage);
    }
  });
};
