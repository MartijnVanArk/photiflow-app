import { CameraCapturedPicture } from "expo-camera";
import { ImagePickerResult } from "expo-image-picker";

export enum CCActionTypes {
  LEAVE_Event = "LEAVE_Event",
  TRY_JOIN_Event = "TRY_JOIN_Event",
  ADD_PIC_FROM_CAMERA = "ADD_FROM_CAMERA",
  ADD_PIC_FROM_GALLERY = "ADD_FROM_GALLERY",
}

export type CCLeaveEvent = {
  type: CCActionTypes.LEAVE_Event;
};

export type CCTryJoinEvent = {
  type: CCActionTypes.TRY_JOIN_Event;
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

export type CCActions =
  | CCLeaveEvent
  | CCTryJoinEvent
  | CCPictureFromCameraAction
  | CCPictureFromGalleryAction;
