import { PropsWithChildren, useEffect, useReducer } from "react";

import { EventAuthActionTypes } from "@/actions/EventAuthActions";
import { publicEventsApi } from "@/api/PublicEventApi/PublicEventApiClient";
import { EventAuthReducer } from "@/reducers/EventAuthReducer";
import { AppMainStorage, AUTH_TOKEN_KEY } from "@/utils/system/storage";

import { EventAuthContext } from "./base/BaseEventAuthContext";

export const EventAuthContextProvider = ({ children }: PropsWithChildren) => {
  const [EventState, EventStateDispatch] = useReducer(EventAuthReducer, {
    isValidEventId: false,
    lastToken: "",
    EventId: "",
    loading: true,
    isTryingToJoin: false,
    EventInfo: null,
  });

  useEffect(() => {
    console.log("Loading Event Id Stuff");

    const loadEventId = async () => {
      const savedToken = (await AppMainStorage.getItem(AUTH_TOKEN_KEY)) ?? "";

      publicEventsApi.setBearerToken(savedToken);

      const eventInfo = await publicEventsApi.getEventInfo();

      EventStateDispatch({
        type: EventAuthActionTypes.LOADED,
        payload: {
          fromToken: eventInfo ? savedToken : "",
          Event: eventInfo,
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
