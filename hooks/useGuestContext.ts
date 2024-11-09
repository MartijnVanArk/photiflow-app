import { useContext } from "react";

import { GuestContext } from "@/context/base/BaseGuestContext";

const useGuestContext = () => {
  const con = useContext(GuestContext);
  if (!con)
    throw new Error(
      "useGuestContext can only be used inside GuestContextProvider",
    );
  return con;
};

export default useGuestContext;
