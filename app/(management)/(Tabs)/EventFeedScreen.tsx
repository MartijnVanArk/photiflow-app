import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { PixelRatio, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PageHeader from "@/components/header/PageHeader";
import ThemeText from "@/components/ui/themed/ThemeText";
import useTheme from "@/hooks/useTheme";

const ratio = PixelRatio.get();
export default function EventFeedScreen() {
  const { getVarColor } = useTheme();
  return (
    <SafeAreaView className="bg-light h-full ">
      <PageHeader
        handleInset={false}
        leftClick={() => {
          router.dismissAll();
        }}
        titlei18n="management-tab-feed"
      />
      <StatusBar
        style="light"
        backgroundColor={getVarColor("--color-primary-default")}
      />
      <View
        className="flex-1 p-8 flex items-center justify-center"
        style={{ marginBottom: 48 * ratio }}
      >
        <ThemeText className="text-center">EventFeedScreen</ThemeText>
      </View>
    </SafeAreaView>
  );
}
