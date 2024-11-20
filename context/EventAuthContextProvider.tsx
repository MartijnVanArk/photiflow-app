import { PropsWithChildren, useEffect, useReducer } from "react";

import { EventAuthActionTypes } from "@/actions/EventAuthActions";
import { publicEventsApi } from "@/api/PublicEventApi/PublicEventApiClient";
import { TestEventResponse } from "@/data/getinforesponse";
import { EventAuthReducer } from "@/reducers/EventAuthReducer";
import { basicJWTChecks } from "@/utils/jwtutils";
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
      // const savedToken = (await AppMainStorage.getItem(AUTH_TOKEN_KEY)) ?? "";

      // if (!savedToken || !basicJWTChecks(savedToken)) {
      //   EventStateDispatch({
      //     type: EventAuthActionTypes.LOADED,
      //     payload: {
      //       fromToken: "",
      //       Event: null,
      //     },
      //   });
      //   return;
      // }

      const savedToken =
        "eyJhbGciOiJSUzI1NiIsImtpZCI6Imt5LTEyMzQ1IiwidHlwIjoiSldUIn0.eyJhdWQiOlsiaHR0cHM6Ly96a3Z6ZHcweDliLmV4ZWN1dGUtYXBpLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tIl0sImV2ZW50LWlkIjoiZXZ0LU9LNzdZWlBZdzJtcVpGQiIsImV4cCI6MTczMjIzMzYwMCwiaWF0IjoxNzMyMTA4MzUwLCJpc3MiOiJodHRwczovL3prdnpkdzB4OWIuZXhlY3V0ZS1hcGkuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb20vIiwibmJmIjoxNzMxODg4MDAwLCJvd25lci1pZCI6ImF1dGgwfDY3MWViNjZiMDMwMGM5NjhhM2U0YjY5YyIsInNjb3BlIjoib3BlbmlkIiwic291cmNlLWlkIjoic3JjLTJsWGlycnZhYmZJZjRGSyIsInN1YiI6ImR2aS1KcjA1NWl1SFo4WGNpUmNQR2Y0WFMifQ.Su55wuUjj6Go0NbXWr2uqAsvy9n7zKxTZ-KXqzGV_BfpbkxPZTkSKbNBoMqwCpjl_1LusVYXCswZGcvVjI6OEu1zn8NXdoORP1vwe4kMxt707me37DvG56US7u64qy1d2zA4RBZ5UcOp2rnN4rnlYGaFeS667gQUgY0K7OlxxnI";

      console.log("Loaded token: ", savedToken);

      publicEventsApi.setBearerToken(savedToken);

      //      const eventInfo = await publicEventsApi.getEventInfo();

      const eventInfo = TestEventResponse;

      console.log("Loaded event info: ", JSON.stringify(eventInfo, null, 2));

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
