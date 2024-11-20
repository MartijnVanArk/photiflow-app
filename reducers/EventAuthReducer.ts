import { GetInfoCommandOutput } from "@partystream/client-app";

import {
  EventAuthactions,
  EventAuthActionTypes,
} from "@/actions/EventAuthActions";
import { AppMainStorage, AUTH_TOKEN_KEY } from "@/utils/system/storage";

export type EventAuthState = {
  isValidEventId: boolean;
  lastToken: string;
  EventId: string;
  loading: boolean;
  isTryingToJoin: boolean;
  EventInfo: GetInfoCommandOutput | null;
};

export type EventJoinResult = {
  didJoin: boolean;
};

export const EventAuthReducer = (
  state: EventAuthState,
  action: EventAuthactions,
): EventAuthState => {
  console.log("Event Auth Reducer: ", action);

  switch (action.type) {
    case EventAuthActionTypes.LOADED: {
      const hasEvent = action.payload.Event !== null;
      const EventId = hasEvent ? action.payload.Event!.Event.EventId : "";
      const token = hasEvent ? action.payload.fromToken : "";

      AppMainStorage.saveItem(AUTH_TOKEN_KEY, token);

      return {
        ...state,
        EventId: EventId,
        isValidEventId: hasEvent,
        loading: false,
        isTryingToJoin: false,
        EventInfo: hasEvent ? action.payload.Event : null,
      };
    }

    case EventAuthActionTypes.TRYJOINSTART: {
      return { ...state, isTryingToJoin: true };
    }

    case EventAuthActionTypes.TRYJOINRESULT: {
      const hasEvent = action.payload.Event !== null;
      const EventId = hasEvent ? action.payload.Event!.Event.EventId : "";

      const token = hasEvent ? action.payload.lastToken : "";

      AppMainStorage.saveItem(AUTH_TOKEN_KEY, token);

      return {
        ...state,
        lastToken: token,
        isTryingToJoin: false,
        EventId: EventId,
        isValidEventId: hasEvent,
        EventInfo: action.payload.Event,
      };
    }

    case EventAuthActionTypes.LEAVE: {
      AppMainStorage.saveItem(AUTH_TOKEN_KEY, "");
      return {
        ...state,
        isValidEventId: false,
        EventId: "",
        loading: false,
        isTryingToJoin: false,
        EventInfo: null,
      };
    }
    case EventAuthActionTypes.SETLASTTOKEN: {
      AppMainStorage.saveItem(AUTH_TOKEN_KEY, action.payload.lastToken);
      return { ...state, lastToken: action.payload.lastToken };
    }
  }

  return state;
};
