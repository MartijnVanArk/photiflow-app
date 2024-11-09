import { PropsWithChildren, useEffect, useReducer } from "react";
import { Settings } from "react-native";

import { GuestActionTypes } from "@/actions/GuestActions";
import { GuestInfoState, GuestReducer } from "@/reducers/GuestReducer";

import { GuestContext } from "./base/BaseGuestContext";
export const GuestContextProvider = ({ children }: PropsWithChildren) => {
  const [guestInfo, guestInfoDispatch] = useReducer(GuestReducer, {
    name: "",
    email: "",
  });

  useEffect(() => {
    const savedGuestInfo: GuestInfoState = Settings.get("guest-info");

    if (savedGuestInfo)
      guestInfoDispatch({
        type: GuestActionTypes.LOADED,
        payload: {
          guestInfo: savedGuestInfo,
        },
      });
  }, []);

  return (
    <GuestContext.Provider value={{ guestInfo, guestInfoDispatch }}>
      {children}
    </GuestContext.Provider>
  );
};
