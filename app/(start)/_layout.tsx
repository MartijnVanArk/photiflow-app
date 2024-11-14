import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      initialRouteName="WelcomeScreen"
      screenOptions={{ headerShown: false, animation: "ios_from_right" }}
    >
      <Stack.Screen name="WelcomeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="ScanScreen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
