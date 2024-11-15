import { Stack } from "expo-router";

import useTheme from "@/hooks/useTheme";

const Layout = () => {
  const { getVarColor } = useTheme();
  return (
    <Stack
      initialRouteName="WelcomeScreen"
      screenOptions={{
        headerShown: false,
        animation: "ios_from_right",
        contentStyle: { backgroundColor: getVarColor("--color-light-default") },
      }}
    >
      <Stack.Screen name="WelcomeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="ScanScreen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
