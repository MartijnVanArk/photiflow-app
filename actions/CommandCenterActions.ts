import { CameraCapturedPicture } from "expo-camera";
import { ImagePickerResult } from "expo-image-picker";

export enum CCActionTypes {
  LEAVE_PARTY = "LEAVE_PARTY",
  TRY_JOIN_PARTY = "TRY_JOIN_PARTY",
  ADD_PIC_FROM_CAMERA = "ADD_FROM_CAMERA",
  ADD_PIC_FROM_GALLERY = "ADD_FROM_GALLERY",
}

export type CCLeaveParty = {
  type: CCActionTypes.LEAVE_PARTY;
};

export type CCTryJoinParty = {
  type: CCActionTypes.TRY_JOIN_PARTY;
  payload: {
    partyId: string;
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
  | CCLeaveParty
  | CCTryJoinParty
  | CCPictureFromCameraAction
  | CCPictureFromGalleryAction;
