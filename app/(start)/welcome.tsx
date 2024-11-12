import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Linking, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ThemeButton from "@/components/ui/ThemeButton";
import { images } from "@/constants/images";
import useTheme from "@/hooks/useTheme";

export default function WelcomeScreen() {
  const goScan = useCallback(() => {
    router.push("/(start)/scan");
  }, []);

  const goCreate = useCallback(async () => {
    const url = "https://www.jvdwaal.nl/";
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Whoopsie");
    }
  }, []);

  const openSite = useCallback(async () => {
    const url = "https://www.mvanark.nl";
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Whoopsie");
    }
  }, []);

  const { theme } = useTheme();

  const bgColors =
    theme === "light" ? ["#aacef6", "#ECEDED"] : ["#3a5e96", "#1E1E1E"];

  const { t } = useTranslation();

  return (
    <LinearGradient
      colors={bgColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView className="flex h-screen items-center justify-normal p-8">
        <View className="flex flex-row items-center justify-center w-full mt-10">
          <Text className="text-5xl text-textmain font-NunitoBold mx-10 text-center">
            {t("welcome-welcome-title")}
          </Text>
        </View>
        <Text className="text-md  font-Nunito text-textmain text-2xl text-center  mx-10 mt-3">
          {t("welcome-welcome-tagline")}
        </Text>

        <Image
          style={{ flexGrow: 1, width: "100%" }}
          className="my-16"
          contentFit="contain"
          source={images.eventintro}
        />

        <ThemeButton
          onPress={goScan}
          className="py-8 w-full text-xl"
          variant="primary"
          title={t("welcome-scan-button-title")}
          subtitle={t("welcome-scan-button-subtitle")}
          textSize="text-2xl"
          iconLeft={{ name: "qrcode-scan", size: 36 }}
        />
        <ThemeButton
          onPress={goCreate}
          className="py-8 w-full text-xl mt-4"
          variant="outline"
          title={t("welcome-create-button-title")}
          subtitle={t("welcome-create-button-subtitle")}
          textSize="text-2xl"
          iconLeft={{ name: "calendar-edit", size: 36 }}
        />
        <View className="flex flex-row my-4 py-4 ">
          <Text className="font-Nunito text-textmain text-lg">
            {t("welcome-dontknow-text")}{" "}
          </Text>
          <TouchableOpacity onPress={openSite}>
            <Text className="font-NunitoExtraBold text-primary underline text-lg ">
              {t("welcome-dontknow-linktext")}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
