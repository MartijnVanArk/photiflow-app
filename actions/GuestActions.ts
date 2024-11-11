import { GuestInfoState } from "@/reducers/GuestReducer";

export enum GuestActionTypes {
  LOADED = "LOADED",
  PROFILESAVED = "PROFILESAVED",
  UPDATENAME = "UPDATENAME",
}

export type GuestInfoLoadedAction = {
  type: GuestActionTypes.LOADED;
  payload: {
    guestInfo: GuestInfoState;
  };
};

export type GuestProfileSaved = {
  type: GuestActionTypes.PROFILESAVED;
  payload: {
    guestInfo: GuestInfoState;
  };
};

export type GuestUpdateNameAction = {
  type: GuestActionTypes.UPDATENAME;
  payload: {
    name: string;
  };
};

export type GuestActions =
  | GuestInfoLoadedAction
  | GuestProfileSaved
  | GuestUpdateNameAction;
