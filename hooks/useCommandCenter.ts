import { useContext } from "react";

import { CommandCenterContext } from "@/context/base/CommandCenterContext";

const useCommandCenter = () => {
  const con = useContext(CommandCenterContext);
  if (!con)
    throw new Error(
      "useCommandCenter can only be used inside CommandCenterContextProvider",
    );
  return con;
};

export default useCommandCenter;
