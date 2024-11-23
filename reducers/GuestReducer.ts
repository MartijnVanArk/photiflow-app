import { GuestActions, GuestActionTypes } from "@/actions/GuestActions";
import { publicEventsApi } from "@/api/PublicEventApi/PublicEventApiClient";
import { loadAsJpeg } from "@/utils/pictureprocessing";
import { AppMainStorage, GUEST_INFO_KEY } from "@/utils/system/storage";

export type GuestInfoState = {
  name: string;
  email: string;
  avatar: string;
  uid: string;
  birthDate: string;
  defTags: string[];
};

export const GuestReducer = (
  state: GuestInfoState,
  action: GuestActions,
): GuestInfoState => {
  console.log("Guest Reducer : ", action);

  const saveGuest = async (guest: GuestInfoState) => {
    const saveInfo = JSON.stringify(guest);
    AppMainStorage.saveItem(GUEST_INFO_KEY, saveInfo);

    await publicEventsApi.updateGuestInfo(
      guest.name,
      guest.email,
      guest.birthDate,
      guest.defTags,
    );

    const url = await publicEventsApi.makeAvatarUploadUrl();

    if (url) {
      const jpeg = await loadAsJpeg(guest.avatar);

      if (jpeg) {
        await publicEventsApi.uploadAvatarJpeg(url, jpeg);
      }
    }
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
      if (action.payload.name === state.name) {
        return state;
      }

      const newState = { ...state, name: action.payload.name };

      saveGuest(newState);
      return newState;
    }
  }

  return state;
};
