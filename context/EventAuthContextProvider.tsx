import { PropsWithChildren, useEffect, useReducer } from "react";

import { EventAuthActionTypes } from "@/actions/EventAuthActions";
import { EventAuthReducer } from "@/reducers/EventAuthReducer";
import { AppMainStorage, EVENT_ID_KEY } from "@/utils/storage";

import { EventAuthContext } from "./base/BaseEventAuthContext";

export const EventAuthContextProvider = ({ children }: PropsWithChildren) => {
  const [EventState, EventStateDispatch] = useReducer(EventAuthReducer, {
    isValidEventId: false,
    EventId: "",
    loading: true,
    isTryingToJoin: false,
    EventInfo: null,
  });

  useEffect(() => {
    console.log("Loading Event Id Stuff");

    const loadEventId = async () => {
      const savedId = (await AppMainStorage.getItem(EVENT_ID_KEY)) ?? "";

      EventStateDispatch({
        type: EventAuthActionTypes.LOADED,
        payload: {
          EventId: savedId,
        },
      });
    };
    loadEventId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EventAuthContext.Provider value={{ EventState, EventStateDispatch }}>
      {children}
    </EventAuthContext.Provider>
  );
};
