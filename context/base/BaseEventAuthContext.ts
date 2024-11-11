import { createContext, Dispatch } from "react";

import { EventAuthactions } from "@/actions/EventAuthActions";
import { EventAuthState } from "@/reducers/EventAuthReducer";

export type EventAutContextType = {
  EventState: EventAuthState;
  EventStateDispatch: Dispatch<EventAuthactions>;
};

export const EventAuthContext = createContext<EventAutContextType | null>(null);
