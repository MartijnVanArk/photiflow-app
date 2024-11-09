import { PartyInfo } from "@/types/partyinfo";

export enum PartyAuthActionTypes {
  LOADED = "LOADED",
  TRYJOINSTART = "TRY_JOIN_START",
  TRYJOINRESULT = "TRY_JOIN_RESULT",
  LEAVE = "LEAVE",
}

export type PartyInfoLoadedAction = {
  type: PartyAuthActionTypes.LOADED;
  payload: {
    partyId: string;
  };
};

export type PartyTryJoinStartAction = {
  type: PartyAuthActionTypes.TRYJOINSTART;
  payload: {
    partyId: string;
  };
};

export type PartyTryJoinResultAction = {
  type: PartyAuthActionTypes.TRYJOINRESULT;
  payload: {
    party: PartyInfo | null;
  };
};

export type PartyLeaveAction = {
  type: PartyAuthActionTypes.LEAVE;
};

export type PartyAuthactions =
  | PartyInfoLoadedAction
  | PartyTryJoinStartAction
  | PartyTryJoinResultAction
  | PartyLeaveAction;
