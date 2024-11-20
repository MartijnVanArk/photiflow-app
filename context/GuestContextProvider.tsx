import { PropsWithChildren, useEffect, useReducer } from "react";

import { GuestActionTypes } from "@/actions/GuestActions";
import { GuestInfoState, GuestReducer } from "@/reducers/GuestReducer";
import { avatarSaveURI, getSavedAvatarURI } from "@/utils/avatar-utils";
import { AppMainStorage, GUEST_INFO_KEY } from "@/utils/system/storage";
import { getDeviceID } from "@/utils/system/system";

import { GuestContext } from "./base/BaseGuestContext";

export const GuestContextProvider = ({ children }: PropsWithChildren) => {
  const [guestInfo, guestInfoDispatch] = useReducer(GuestReducer, {
    name: "",
    email: "",
    avatar: "",
    uid: "",
    birthDate: "",
  });

  useEffect(() => {
    const loadGuestInfo = async () => {
      const savedGuestInfo = await AppMainStorage.getItem(GUEST_INFO_KEY);

      const parsedInfo = JSON.parse(savedGuestInfo || "{}") as GuestInfoState;

      if (parsedInfo) {
        parsedInfo.uid = await getDeviceID();

        if (parsedInfo.avatar === avatarSaveURI()) {
          getSavedAvatarURI(parsedInfo.avatar).then((uri) => {
            parsedInfo.avatar = uri;
            guestInfoDispatch({
              type: GuestActionTypes.LOADED,
              payload: {
                guestInfo: parsedInfo as GuestInfoState,
              },
            });
          });
        } else {
          guestInfoDispatch({
            type: GuestActionTypes.LOADED,
            payload: {
              guestInfo: parsedInfo as GuestInfoState,
            },
          });
        }
      }
    };

    loadGuestInfo();
  }, []);

  return (
    <GuestContext.Provider value={{ guestInfo, guestInfoDispatch }}>
      {children}
    </GuestContext.Provider>
  );
};
