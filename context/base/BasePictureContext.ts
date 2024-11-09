import { createContext, Dispatch } from "react";

import { PictureActions } from "@/actions/PictureActions";
import { PictureState } from "@/reducers/PictureReducer";

export type PictureAcquisitionSource = "camera" | "gallery";

export type PictureContextType = {
  pictureState: PictureState;
  pictureStateDispatch: Dispatch<PictureActions>;
};

export const PictureContext = createContext<PictureContextType | null>(null);
