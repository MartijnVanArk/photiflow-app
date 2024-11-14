import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      initialRouteName="EventScreen"
      screenOptions={{ headerShown: false, animation: "ios_from_right" }}
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
