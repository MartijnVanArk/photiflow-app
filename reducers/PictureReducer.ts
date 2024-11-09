import { PictureActions, PictureActionTypes } from "@/actions/PictureActions";
import { BasicImageData } from "@/types/pictureinfo";

export type PictureState = {
  lastPicture: BasicImageData | null;
};

const PictureReducer = (
  state: PictureState,
  action: PictureActions,
): PictureState => {
  //console.log("Picture Reducer: ", action);

  switch (action.type) {
    case PictureActionTypes.NEW_PICTURE: {
      console.log(action.payload.photo.uri);
      return { ...state, lastPicture: action.payload.photo };
    }
  }

  return state;
};

export default PictureReducer;
