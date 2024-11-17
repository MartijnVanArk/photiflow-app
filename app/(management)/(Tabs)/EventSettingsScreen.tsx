import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { PixelRatio, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PageHeader from "@/components/header/PageHeader";
import InputControl from "@/components/ui/input/InputControl";
import ThemeText from "@/components/ui/themed/ThemeText";
import ThemeIconTitle from "@/components/ui/ThemeIconTitle";
import useTheme from "@/hooks/useTheme";

const ratio = PixelRatio.get();

export default function EventSettingsScreen() {
  const { getVarColor } = useTheme();

  return (
    <SafeAreaView className="bg-light h-full">
      <PageHeader
        handleInset={false}
        leftClick={() => {
          router.dismissAll();
        }}
        titlei18n="management-tab-settings"
      />
      <StatusBar
        style="light"
        backgroundColor={getVarColor("--color-primary-default")}
      />
      <ScrollView className="flex-1  p-4 ">
        <View className="flex-col items-center gap-4">
          <View className="bg-lightsec p-4 flex w-full rounded-2xl">
            <ThemeIconTitle
              icon={{ name: "cog", size: 24 }}
              title="Event Setting"
            />

            <InputControl placeholder="Event Name" className="my-2" />
            <InputControl placeholder="Event Name" className="my-2" />
            <InputControl placeholder="Event Name" className="my-2" />
          </View>

          <View className="bg-lightsec p-4 flex w-full rounded-2xl">
            <ThemeIconTitle
              icon={{ name: "cog", size: 24 }}
              title="Event Setting"
            />

            <InputControl placeholder="Event Name" className="my-2" />
            <InputControl placeholder="Event Name" className="my-2" />
            <InputControl placeholder="Event Name" className="my-2" />
          </View>

          <ThemeText className="text-center font-NunitoSemiBold">
            Even wachten op API en definitieve data van backend voor wat hier
            allemaal in te proppen
          </ThemeText>

          <View
            className="flex-row items-center justify-center gap-2 bg-red-400"
            style={{ height: 48 * ratio }}
          ></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
