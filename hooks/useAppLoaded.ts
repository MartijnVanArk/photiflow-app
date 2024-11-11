import { useFonts } from "expo-font";
import { useEffect, useState } from "react";

const useAppLoaded = () => {
  const [appLoaded, setAppLoaded] = useState(false);

  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
    "Nunito-ExtraBold": require("../assets/fonts/Nunito-ExtraBold.ttf"),
    "Nunito-ExtraLight": require("../assets/fonts/Nunito-ExtraLight.ttf"),
    "Nunito-Light": require("../assets/fonts/Nunito-Light.ttf"),
    "Nunito-Medium": require("../assets/fonts/Nunito-Medium.ttf"),
    Nunito: require("../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-SemiBold": require("../assets/fonts/Nunito-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded && !appLoaded) setAppLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fontsLoaded]);

  return appLoaded;
};

export default useAppLoaded;
