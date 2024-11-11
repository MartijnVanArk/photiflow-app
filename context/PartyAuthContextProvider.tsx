import { PropsWithChildren, useEffect, useReducer } from "react";

import { PartyAuthActionTypes } from "@/actions/PartyAuthActions";
import { AppMainStorage, PARTY_ID_KEY } from "@/lib/storage";
import { PartyAuthReducer } from "@/reducers/PartyAuthReducer";

import { PartyAuthContext } from "./base/BasePartyAuthContext";

export const PartyAuthContextProvider = ({ children }: PropsWithChildren) => {
  const [partyState, partyStateDispatch] = useReducer(PartyAuthReducer, {
    isValidPartyId: false,
    partyId: "",
    loading: true,
    isTryingToJoin: false,
    partyInfo: null,
  });

  useEffect(() => {
    console.log("Loading Party Id Stuff");

    const loadPartyId = async () => {
      const savedId = (await AppMainStorage.getItem(PARTY_ID_KEY)) ?? "";

      partyStateDispatch({
        type: PartyAuthActionTypes.LOADED,
        payload: {
          partyId: savedId,
        },
      });
    };
    loadPartyId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PartyAuthContext.Provider value={{ partyState, partyStateDispatch }}>
      {children}
    </PartyAuthContext.Provider>
  );
};
