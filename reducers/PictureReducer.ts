import { PictureActions, PictureActionTypes } from "@/actions/PictureActions";
import { InternalImageData } from "@/types/pictureinfo";
import { emptyImage } from "@/utils/pictureprocessing";
import { mergeTags } from "@/utils/tagutils";

export type PictureState = {
  isUploading: boolean;
  lastPicture: InternalImageData | null;
};

const PictureReducer = (
  state: PictureState,
  action: PictureActions,
): PictureState => {
  console.log("Picture Reducer: ", action);

  switch (action.type) {
    case PictureActionTypes.NEW_PICTURE: {
      return { ...state, lastPicture: action.payload.photo };
    }
    case PictureActionTypes.CLEAR_PICTURE:
      return { ...state, lastPicture: { ...emptyImage } };
    case PictureActionTypes.WAS_UPLOADED:
      if (state.lastPicture) {
        return {
          ...state,
          isUploading: false,
          lastPicture: {
            ...state.lastPicture,
            wasUploaded: action.payload.success,
          },
        };
      }
      break;
    case PictureActionTypes.SET_PRE_UPLOAD_INFO: {
      if (state.lastPicture) {
        const newLp = { ...state.lastPicture };

        newLp.tags = mergeTags(action.payload.tags, newLp.tags);

        newLp.comment = action.payload.comment;
        newLp.guest.name = action.payload.guestName;

        return {
          ...state,
          isUploading: true,
          lastPicture: newLp,
        };
      }
      break;
    }
  }

  return state;
};

export default PictureReducer;
