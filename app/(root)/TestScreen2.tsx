import React from "react";
import { View, Text } from "react-native";
import Animated from "react-native-reanimated";

import CloseBackButton from "@/components/ui/CloseBackButton";

const TestScreen2 = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <CloseBackButton />
      <Text>TestScreen2</Text>
      <Animated.Image
        sharedTransitionTag="imageMain"
        source={{
          uri: "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
        }}
        style={{ width: 500, height: 500 }}
      />
    </View>
  );
};

export default TestScreen2;
