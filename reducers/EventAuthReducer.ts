import {
  EventAuthactions,
  EventAuthActionTypes,
} from "@/actions/EventAuthActions";
import { EventInfo } from "@/types/eventinfo";
import { AppMainStorage, EVENT_ID_KEY, validateEventId } from "@/utils/storage";

export type EventAuthState = {
  isValidEventId: boolean;
  EventId: string;
  loading: boolean;
  isTryingToJoin: boolean;
  EventInfo: EventInfo | null;
};

export type EventJoinResult = {
  didJoin: boolean;
};

export const fakeTestEvent: EventInfo = {
  Name: "Bruiloft Joost & Marianne",
  EventType: "wedding",
  CreationDate: "2024-11-08 13:12:14",
  LastUpdateDate: "2024-11-08 13:12:14",
  OwnerId: "O12345",
  EventDate: "2024-11-08 13:12:14",
  EventId: "P1234567890",
  EventState: "active",
  Owner: {
    Email: "martijn@mvanark.nl",
    Name: "Martijn van Ark",
    OwnerId: "O54321",
  },
  BackgroundImage: "",
  IntroPhoto: "",
  WelcomeTitle: "Een dag uit duizenden",
  WelcomeMessage:
    "Wat leuk dat je onze dag mee viert! Om het nog specialer te maken vragen we je alle top momenten vast te leggen en toe te voegen.",
};

export const EventAuthReducer = (
  state: EventAuthState,
  action: EventAuthactions,
): EventAuthState => {
  console.log("Event Auth Reducer: ", action);

  switch (action.type) {
    case EventAuthActionTypes.LOADED: {
      const vp = validateEventId(action.payload.EventId);

      return {
        ...state,
        EventId: vp ? action.payload.EventId : "",
        isValidEventId: vp,
        loading: false,
        isTryingToJoin: false,
        EventInfo: vp ? fakeTestEvent : null,
      };
    }

    case EventAuthActionTypes.TRYJOINSTART: {
      return { ...state, isTryingToJoin: true };
    }

    case EventAuthActionTypes.TRYJOINRESULT: {
      const hasEvent = action.payload.Event !== null;
      const EventId = hasEvent ? action.payload.Event!.EventId : "";

      AppMainStorage.saveItem(EVENT_ID_KEY, EventId);

      return {
        ...state,
        isTryingToJoin: false,
        EventId: EventId,
        isValidEventId: hasEvent,
        EventInfo: action.payload.Event,
      };
    }

    case EventAuthActionTypes.LEAVE: {
      AppMainStorage.saveItem(EVENT_ID_KEY, "");
      return {
        ...state,
        isValidEventId: false,
        EventId: "",
        loading: false,
        isTryingToJoin: false,
        EventInfo: null,
      };
    }
  }

  return state;
};
