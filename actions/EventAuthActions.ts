import { EventInfo } from "@/types/eventinfo";

export enum EventAuthActionTypes {
  LOADED = "LOADED",
  TRYJOINSTART = "TRY_JOIN_START",
  TRYJOINRESULT = "TRY_JOIN_RESULT",
  LEAVE = "LEAVE",
}

export type EventInfoLoadedAction = {
  type: EventAuthActionTypes.LOADED;
  payload: {
    EventId: string;
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
    Event: EventInfo | null;
  };
};

export type EventLeaveAction = {
  type: EventAuthActionTypes.LEAVE;
};

export type EventAuthactions =
  | EventInfoLoadedAction
  | EventTryJoinStartAction
  | EventTryJoinResultAction
  | EventLeaveAction;
