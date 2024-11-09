import { GuestInfoState } from "@/reducers/GuestReducer";

export enum GuestActionTypes {
  LOADED = "LOADED",
}

export type GuestInfoLoadedAction = {
  type: GuestActionTypes.LOADED;
  payload: {
    guestInfo: GuestInfoState;
  };
};

export type GuestActions = GuestInfoLoadedAction;
