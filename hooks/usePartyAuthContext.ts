import { useContext } from "react";

import { PartyAuthContext } from "@/context/base/BasePartyAuthContext";

const usePartyAuthContext = () => {
  const con = useContext(PartyAuthContext);

  if (!con) {
    throw new Error(
      "usePartyAuthCon can only be used inside PartyAuthContextProvider",
    );
  }

  return con;
};

export default usePartyAuthContext;
