import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      initialRouteName="EventScreen"
      screenOptions={{ headerShown: false }}
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
