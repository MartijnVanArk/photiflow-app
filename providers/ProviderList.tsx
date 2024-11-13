import { PortalProvider } from "@gorhom/portal";
import { PropsWithChildren } from "react";

import { EventAuthContextProvider } from "@/context/EventAuthContextProvider";
import { GuestContextProvider } from "@/context/GuestContextProvider";
import { PictureContextProvider } from "@/context/PictureContextProvider";

import CommandCenterProvider from "./CommandCenterProvider";
import { ThemeProvider } from "./ThemeProvider";

const ProviderList = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <PortalProvider>
        <GuestContextProvider>
          <EventAuthContextProvider>
            <PictureContextProvider>
              <CommandCenterProvider>{children}</CommandCenterProvider>
            </PictureContextProvider>
          </EventAuthContextProvider>
        </GuestContextProvider>
      </PortalProvider>
    </ThemeProvider>
  );
};

export default ProviderList;
