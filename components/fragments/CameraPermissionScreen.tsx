import { PermissionResponse } from "expo-camera";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ThemeButton from "@/components/ui/ThemeButton";

import CloseBackButton from "../ui/CloseBackButton";

export interface CameraPermissionScreenProps {
  requestPermission: () => Promise<PermissionResponse>;
}

const CameraPermissionScreen = ({
  requestPermission,
}: CameraPermissionScreenProps) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 gap-8 p-8 h-full justify-center items-center bg-light">
      <Text className="text-xl font-Nunito text-center text-textmain">
        {t("camera-permission-statement")}
      </Text>
      <ThemeButton
        onPress={requestPermission}
        title={t("camera-permission-button-grant")}
      />

      <CloseBackButton />
    </SafeAreaView>
  );
};

export default CameraPermissionScreen;
