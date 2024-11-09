import { GuestActions } from "@/actions/GuestActions";

export type GuestInfoState = {
  name: string;
  email: string;
};

export const GuestReducer = (
  state: GuestInfoState,
  action: GuestActions,
): GuestInfoState => {
  console.log("Guest Reducer : ", action);

  return state;
};
