import { createContext, Dispatch } from "react";

import { PartyAuthactions } from "@/actions/PartyAuthActions";
import { PartyAuthState } from "@/reducers/PartyAuthReducer";

export type PartyAutContextType = {
  partyState: PartyAuthState;
  partyStateDispatch: Dispatch<PartyAuthactions>;
};

export const PartyAuthContext = createContext<PartyAutContextType | null>(null);
