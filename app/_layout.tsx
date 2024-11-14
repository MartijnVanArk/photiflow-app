import "@/css/global.css";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import useAppLoaded from "@/hooks/useAppLoaded";
import ProviderList from "@/providers/ProviderList";
import { initLanguages } from "@/utils/system/language";

initLanguages();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const appLoaded = useAppLoaded();

  useEffect(() => {
    if (appLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appLoaded]);

  if (!appLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ProviderList>
        <Stack
          screenOptions={{ headerShown: false, animation: "ios_from_right" }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
      </ProviderList>
    </GestureHandlerRootView>
  );
}
