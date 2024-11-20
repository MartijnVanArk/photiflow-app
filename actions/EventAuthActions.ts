import { GetInfoCommandOutput } from "@partystream/client-app";

export enum EventAuthActionTypes {
  LOADED = "LOADED",
  TRYJOINSTART = "TRY_JOIN_START",
  TRYJOINRESULT = "TRY_JOIN_RESULT",
  LEAVE = "LEAVE",
  SETLASTTOKEN = "SET_LAST_TOKEN",
}

export type EventInfoLoadedAction = {
  type: EventAuthActionTypes.LOADED;
  payload: {
    fromToken: string;
    Event: GetInfoCommandOutput | null;
  };
};

export type EventTryJoinStartAction = {
  type: EventAuthActionTypes.TRYJOINSTART;
  payload: {
    EventId: string;
  };
};

export type EventTryJoinResultAction = {
  type: EventAuthActionTypes.TRYJOINRESULT;
  payload: {
    lastToken: string;
    Event: GetInfoCommandOutput | null;
  };
};

export type EventLeaveAction = {
  type: EventAuthActionTypes.LEAVE;
};

export type EventSetLastTokenAction = {
  type: EventAuthActionTypes.SETLASTTOKEN;
  payload: {
    lastToken: string;
  };
};

export type EventAuthactions =
  | EventInfoLoadedAction
  | EventTryJoinStartAction
  | EventTryJoinResultAction
  | EventLeaveAction
  | EventSetLastTokenAction;
