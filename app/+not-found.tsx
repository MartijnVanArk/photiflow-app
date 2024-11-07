import { Link, Stack } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oopsie!" }} />
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="">What are you doing this does not exist</Text>

        <Link href={"/"}>Go Home</Link>
      </SafeAreaView>
    </>
  );
}
