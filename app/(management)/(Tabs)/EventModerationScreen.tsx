import { StatusBar } from "expo-status-bar";
import React from "react";
import { PixelRatio, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ThemeText from "@/components/ui/themed/ThemeText";

const ratio = PixelRatio.get();
export default function EventModerationScreen() {
  return (
    <SafeAreaView className="bg-light h-full ">
      <StatusBar style="auto" />
      <View
        className="flex-1 p-8 flex items-center justify-center"
        style={{ marginBottom: 48 * ratio }}
      >
        <ThemeText className="text-center">EventModerationcreen</ThemeText>
      </View>
    </SafeAreaView>
  );
}
