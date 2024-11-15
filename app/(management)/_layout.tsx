import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      initialRouteName="EnterPinScreen"
      screenOptions={{ headerShown: false, animation: "ios_from_right" }}
    >
      <Stack.Screen name="EnterPinScreen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
