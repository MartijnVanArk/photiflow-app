import { PropsWithChildren, useEffect, useState } from "react";

import { partyIdCache, validatePartyId } from "@/lib/partyIdAuth";

import {
  PartyAuthContext,
  PartyAuthState,
  PartyJoinResult,
} from "./base/BasePartyAuthContext";

export const PartyAuthContextProvider = ({ children }: PropsWithChildren) => {
  const partyKey = "active-party";

  const [partyState, setPartyState] = useState<PartyAuthState>({
    isValidPartyId: false,
    partyId: "",
    loading: true,
  });

  useEffect(() => {
    const loadPartyId = async () => {
      const savedId = (await partyIdCache.getPartyID(partyKey)) ?? "";

      setPartyState({
        ...partyState,
        partyId: savedId,
        isValidPartyId: validatePartyId(savedId),
        loading: false,
      });
    };
    loadPartyId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tryJoinParty = (partyId: string): Promise<PartyJoinResult> => {
    return new Promise<PartyJoinResult>((resolve, _reject) => {
      resolve({ didJoin: false });
    });
  };

  const leaveCurrentParty = () => {
    setPartyState({
      ...partyState,
      isValidPartyId: false,
      partyId: "",
      loading: false,
    });
    partyIdCache.savePartyId(partyKey, "");
  };

  return (
    <PartyAuthContext.Provider
      value={{ partyState, tryJoinParty, leaveCurrentParty }}
    >
      {children}
    </PartyAuthContext.Provider>
  );
};
