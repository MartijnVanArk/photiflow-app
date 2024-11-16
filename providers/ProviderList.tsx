import { PortalProvider } from "@gorhom/portal";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { PropsWithChildren } from "react";
import { useColorScheme } from "react-native";

import { EventAuthContextProvider } from "@/context/EventAuthContextProvider";
import { GuestContextProvider } from "@/context/GuestContextProvider";
import { PictureContextProvider } from "@/context/PictureContextProvider";

import CommandCenterProvider from "./CommandCenterProvider";
import { InternalThemeProvider } from "./InternalThemeProvider";

const ProviderList = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <InternalThemeProvider>
        <PortalProvider>
          <GuestContextProvider>
            <EventAuthContextProvider>
              <PictureContextProvider>
                <CommandCenterProvider>{children}</CommandCenterProvider>
              </PictureContextProvider>
            </EventAuthContextProvider>
          </GuestContextProvider>
        </PortalProvider>
      </InternalThemeProvider>
    </ThemeProvider>
  );
};

export default ProviderList;
