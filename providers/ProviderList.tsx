import { PropsWithChildren } from "react";

import { GuestContextProvider } from "@/context/GuestContextProvider";
import { PartyAuthContextProvider } from "@/context/PartyAuthContextProvider";
import { PictureContextProvider } from "@/context/PictureContextProvider";

import CommandCenterProvider from "./CommandCenterProvider";
import { ThemeProvider } from "./ThemeProvider";

const ProviderList = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <GuestContextProvider>
        <PartyAuthContextProvider>
          <PictureContextProvider>
            <CommandCenterProvider>{children}</CommandCenterProvider>
          </PictureContextProvider>
        </PartyAuthContextProvider>
      </GuestContextProvider>
    </ThemeProvider>
  );
};

export default ProviderList;
