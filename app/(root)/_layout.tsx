import { Stack } from "expo-router";

import useTheme from "@/hooks/useTheme";

const Layout = () => {
  const { getVarColor } = useTheme();

  return (
    <Stack
      initialRouteName="EventScreen"
      screenOptions={{
        headerShown: false,
        animation: "ios_from_right",
        contentStyle: { backgroundColor: getVarColor("--color-light-default") },
      }}
    >
      <Stack.Screen name="EventScreen" options={{ headerShown: false }} />
      <Stack.Screen name="TakePictureScreen" options={{ headerShown: false }} />
      <Stack.Screen
        name="GuestProfileScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PictureViewerScreen"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default Layout;
