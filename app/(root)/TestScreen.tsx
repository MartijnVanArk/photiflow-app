import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CircularProgress from "@/components/circleprogress/CircularProgress";
import ThemeButton from "@/components/ui/themed/ThemeButton";

export default function TestScreen() {
  const [progress, setProgress] = useState(0.3);

  return (
    <SafeAreaView className="bg-light h-full flex items-center justify-center pr-8">
      <StatusBar style="auto" />
      <ThemeButton title="Back" onPress={() => router.back()} />
      <Text>TestScreen</Text>
      <CircularProgress progress={progress} />
      <ThemeButton title="test" onPress={() => setProgress(Math.random())} />
    </SafeAreaView>
  );
}
