import { Stack } from "expo-router";

import useTheme from "@/hooks/useTheme";

const Layout = () => {
  const { getVarColor } = useTheme();

  return (
    <Stack
      initialRouteName="EnterPinScreen"
      screenOptions={{
        headerShown: false,
        animation: "ios_from_right",
        contentStyle: { backgroundColor: getVarColor("--color-light-default") },
      }}
    >
      <Stack.Screen name="EnterPinScreen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
