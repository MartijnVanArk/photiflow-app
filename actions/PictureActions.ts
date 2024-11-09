import { BasicImageData } from "@/types/pictureinfo";

export enum PictureActionTypes {
  NEW_PICTURE = "NEW_PICTURE",
}

export type NewPictureAction = {
  type: PictureActionTypes.NEW_PICTURE;
  payload: {
    photo: BasicImageData;
  };
};

export type PictureActions = NewPictureAction;
