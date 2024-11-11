import { useContext } from "react";

import { EventAuthContext } from "@/context/base/BaseEventAuthContext";

const useEventAuthContext = () => {
  const con = useContext(EventAuthContext);

  if (!con) {
    throw new Error(
      "useEventAuthCon can only be used inside EventAuthContextProvider",
    );
  }

  return con;
};

export default useEventAuthContext;
