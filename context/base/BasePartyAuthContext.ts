import { createContext } from "react";

export type PartyAuthState = {
  isValidPartyId: boolean;
  partyId: string;
  loading: boolean;
};

export type PartyJoinResult = {
  didJoin: boolean;
};

export type PartyAutContextType = {
  partyState: PartyAuthState;
  tryJoinParty: (partyId: string) => Promise<PartyJoinResult>;
  leaveCurrentParty: () => void;
};

export const PartyAuthContext = createContext<PartyAutContextType | null>(null);
