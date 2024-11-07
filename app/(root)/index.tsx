import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IndexScreen() {
  return (
    <SafeAreaView className="flex-1 h-screen items-center justify-center bg-white">
      <Text>Hallo daar ik ben Root index</Text>
    </SafeAreaView>
  );
}
