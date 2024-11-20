import { CameraCapturedPicture } from "expo-camera";
import { ImagePickerResult } from "expo-image-picker";

export enum CCActionTypes {
  LEAVE_EVENT = "LEAVE_EVENT",
  TRY_JOIN_EVENT = "TRY_JOIN_Event",
  ADD_PIC_FROM_CAMERA = "ADD_FROM_CAMERA",
  ADD_PIC_FROM_GALLERY = "ADD_FROM_GALLERY",
  UPLOAD_PHOTO = "UPLOAD_PHOTO",
}

export type CCLeaveEvent = {
  type: CCActionTypes.LEAVE_EVENT;
};

export type CCTryJoinEvent = {
  type: CCActionTypes.TRY_JOIN_EVENT;
  payload: {
    EventId: string;
  };
};

export type CCPictureFromCameraAction = {
  type: CCActionTypes.ADD_PIC_FROM_CAMERA;
  payload: {
    cameraPhoto: CameraCapturedPicture;
  };
};

export type CCPictureFromGalleryAction = {
  type: CCActionTypes.ADD_PIC_FROM_GALLERY;
  payload: {
    galleryPhoto: ImagePickerResult;
  };
};

export type CCUploadPhotoAction = {
  type: CCActionTypes.UPLOAD_PHOTO;
  payload: {
    guestName: string;
    comment: string;
    tags: string[];
    uri: string;
  };
};

export type CCActions =
  | CCLeaveEvent
  | CCTryJoinEvent
  | CCPictureFromCameraAction
  | CCPictureFromGalleryAction
  | CCUploadPhotoAction;
