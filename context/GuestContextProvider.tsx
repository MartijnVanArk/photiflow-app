import { PropsWithChildren, useEffect, useReducer } from "react";

import { GuestActionTypes } from "@/actions/GuestActions";
import { AppMainStorage, GUEST_INFO_KEY } from "@/lib/storage";
import { GuestInfoState, GuestReducer } from "@/reducers/GuestReducer";

import { GuestContext } from "./base/BaseGuestContext";
export const GuestContextProvider = ({ children }: PropsWithChildren) => {
  const [guestInfo, guestInfoDispatch] = useReducer(GuestReducer, {
    name: "",
    email: "",
    avatar: "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
  });

  useEffect(() => {
    const loadGuestInfo = async () => {
      const savedGuestInfo = await AppMainStorage.getItem(GUEST_INFO_KEY);

      const parsedInfo = JSON.parse(savedGuestInfo || "{}");

      if (savedGuestInfo)
        guestInfoDispatch({
          type: GuestActionTypes.LOADED,
          payload: {
            guestInfo: parsedInfo as GuestInfoState,
          },
        });
    };

    loadGuestInfo();
  }, []);

  return (
    <GuestContext.Provider value={{ guestInfo, guestInfoDispatch }}>
      {children}
    </GuestContext.Provider>
  );
};
