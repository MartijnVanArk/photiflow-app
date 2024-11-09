import { useContext } from "react";

import { PictureContext } from "@/context/base/BasePictureContext";

const usePictureContext = () => {
  const con = useContext(PictureContext);

  if (!con)
    throw new Error(
      "usePictureContext can only be used inside PictureContextProvider",
    );

  return con;
};

export default usePictureContext;
