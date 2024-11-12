import { GuestActions, GuestActionTypes } from "@/actions/GuestActions";
import { AppMainStorage, GUEST_INFO_KEY } from "@/utils/system/storage";

export type GuestInfoState = {
  name: string;
  email: string;
  avatar: string;
  uid: string;
};

export const GuestReducer = (
  state: GuestInfoState,
  action: GuestActions,
): GuestInfoState => {
  console.log("Guest Reducer : ", action);

  const saveGuest = (guest: GuestInfoState) => {
    const saveInfo = JSON.stringify(guest);
    AppMainStorage.saveItem(GUEST_INFO_KEY, saveInfo);
  };

  switch (action.type) {
    case GuestActionTypes.LOADED: {
      return { ...state, ...action.payload.guestInfo };
    }
    case GuestActionTypes.PROFILESAVED: {
      const newState = { ...state, ...action.payload.guestInfo };

      saveGuest(newState);
      return newState;
    }
    case GuestActionTypes.UPDATENAME: {
      const newState = { ...state, name: action.payload.name };

      saveGuest(newState);
      return newState;
    }
  }

  return state;
};
