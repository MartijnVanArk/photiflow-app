import { PermissionResponse } from "expo-camera";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import ThemeButton from "@/components/ui/themed/ThemeButton";

import CloseBackButton from "../ui/CloseBackButton";
import ThemeText from "../ui/themed/ThemeText";

export interface CameraPermissionScreenProps {
  requestPermission: () => Promise<PermissionResponse>;
}

const CameraPermissionScreen = ({
  requestPermission,
}: CameraPermissionScreenProps) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 gap-8 p-8 h-full justify-center items-center bg-light">
      <ThemeText className="text-xl text-center ">
        {t("camera-permission-statement")}
      </ThemeText>
      <ThemeButton
        onPress={requestPermission}
        title={t("camera-permission-button-grant")}
      />

      <CloseBackButton />
    </SafeAreaView>
  );
};

export default CameraPermissionScreen;
