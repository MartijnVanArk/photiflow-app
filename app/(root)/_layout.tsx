import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="takepicture" options={{ headerShown: false }} />
      <Stack.Screen name="guest-profile" options={{ headerShown: false }} />
      <Stack.Screen
        name="singlepictureviewer"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default Layout;
