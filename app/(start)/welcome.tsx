import { router } from "expo-router";
import { useCallback } from "react";
import { Alert, Linking, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MyButton from "@/components/ui/MyButton";

export default function WelcomeScreen() {
  const goScan = () => {
    router.push("/(start)/scan");
  };

  const openSite = useCallback(async () => {
    const url = "https://www.mvanark.nl";
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Whoopsie");
    }
  }, []);

  return (
    <>
      <SafeAreaView className="flex h-screen items-center justify-between bg-light p-8">
        <View className="flex flex-row items-center justify-center w-full mt-10">
          <Text className="text-black text-5xl text-textmain font-NunitoBold mx-10 text-center">
            Welcome to Photobooth
          </Text>
        </View>
        <Text className="text-md flex-1 font-NunitoLight text-textsecondary text-2xl text-center  mx-10 mt-3">
          lets make some memories!
        </Text>

        <MyButton
          onPress={goScan}
          className="py-8 text-xl"
          bgVariant="primary"
          title="Scan Party Code"
          textSize="text-2xl"
          iconLeft={{ name: "qrcode-scan", size: 36 }}
        />

        <View className="flex flex-row my-4">
          <Text className="font-Nunito">Dont know what to do </Text>
          <TouchableOpacity onPress={openSite}>
            <Text className="font-NunitoExtraBold text-primary underline ">
              click here
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
