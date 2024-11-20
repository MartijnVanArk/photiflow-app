import { InternalImageData } from "@/types/pictureinfo";

export enum PictureActionTypes {
  NEW_PICTURE = "NEW_PICTURE",
  CLEAR_PICTURE = "CLEAR_PICTURE",
  WAS_UPLOADED = "WAS_UPLOADED",
  SET_PRE_UPLOAD_INFO = "SET_PRE_UPLOAD_INFO",
}

export type NewPictureAction = {
  type: PictureActionTypes.NEW_PICTURE;
  payload: {
    photo: InternalImageData;
  };
};

export type ClearPictureAction = {
  type: PictureActionTypes.CLEAR_PICTURE;
};

export type PictureWasUploadedAction = {
  type: PictureActionTypes.WAS_UPLOADED;
  payload: {
    success: boolean;
  };
};

export type SetNameAndCommentAction = {
  type: PictureActionTypes.SET_PRE_UPLOAD_INFO;
  payload: {
    guestName: string;
    comment: string;
    tags: string[];
    uri: string;
  };
};

export type PictureActions =
  | NewPictureAction
  | ClearPictureAction
  | PictureWasUploadedAction
  | SetNameAndCommentAction;
