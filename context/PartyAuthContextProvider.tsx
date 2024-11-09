import { PropsWithChildren, useEffect, useReducer } from "react";

import { PartyAuthActionTypes } from "@/actions/PartyAuthActions";
import { partyIdCache } from "@/lib/partyIdAuth";
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
      const savedId = (await partyIdCache.getItem("party-id")) ?? "";

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

  // const tryJoinParty = (partyId: string): Promise<PartyJoinResult> => {
  //   return new Promise<PartyJoinResult>((resolve, _reject) => {
  //     setPartyState({ ...partyState, isTryingToJoin: true });
  //     setTimeout(() => {
  //       console.log("Checking ", partyId);
  //       if (validatePartyId("P1234567890")) {
  //         setPartyState({
  //           ...partyState,
  //           isTryingToJoin: false,
  //           partyId,
  //           isValidPartyId: true,
  //           partyInfo: fakeTestparty,
  //         });
  //         partyIdCache.savePartyId(partyKey, partyId);
  //         resolve({ didJoin: false });
  //       } else {
  //         setPartyState({
  //           ...partyState,
  //           isTryingToJoin: false,
  //           partyId: "",
  //           partyInfo: null,
  //         });
  //         partyIdCache.savePartyId(partyKey, "");
  //         resolve({ didJoin: false });
  //       }
  //     }, 2000);
  //   });
  // };

  // const leaveCurrentParty = () => {
  //   setPartyState({
  //     ...partyState,
  //     isValidPartyId: false,
  //     partyId: "",
  //     loading: false,
  //     isTryingToJoin: false,
  //     partyInfo: null,
  //   });
  //   partyIdCache.savePartyId(partyKey, "");
  // };

  return (
    <PartyAuthContext.Provider value={{ partyState, partyStateDispatch }}>
      {children}
    </PartyAuthContext.Provider>
  );
};
