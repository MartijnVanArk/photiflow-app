import { PropsWithChildren, useReducer } from "react";

import PictureReducer from "@/reducers/PictureReducer";

import { PictureContext } from "./base/BasePictureContext";

export const PictureContextProvider = ({ children }: PropsWithChildren) => {
  const [pictureState, pictureStateDispatch] = useReducer(PictureReducer, {
    lastPicture: null,
    isUploading: false,
  });

  return (
    <PictureContext.Provider value={{ pictureState, pictureStateDispatch }}>
      {children}
    </PictureContext.Provider>
  );
};
