import { createContext, Dispatch } from "react";

import { GuestActions } from "@/actions/GuestActions";
import { GuestInfoState } from "@/reducers/GuestReducer";

export type GuestContextType = {
  guestInfo: GuestInfoState;
  guestInfoDispatch: Dispatch<GuestActions>;
};

export const GuestContext = createContext<GuestContextType | null>(null);
