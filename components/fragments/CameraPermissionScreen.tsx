import { PermissionResponse } from "expo-camera";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ThemeButton from "@/components/ui/ThemeButton";

export interface CameraPermissionScreenProps {
  requestPermission: () => Promise<PermissionResponse>;
}

const CameraPermissionScreen = ({
  requestPermission,
}: CameraPermissionScreenProps) => {
  return (
    <SafeAreaView className="flex-1 gap-8 p-8 h-full justify-center items-center bg-light">
      <Text className="text-xl font-Nunito text-center text-textmain">
        We need your permission to show the camera
      </Text>
      <ThemeButton onPress={requestPermission} title="Grant permission" />
    </SafeAreaView>
  );
};

export default CameraPermissionScreen;
