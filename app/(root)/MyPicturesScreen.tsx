import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { Animated, LayoutChangeEvent } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MyPictureListItem from "@/components/fragments/ListItems/MyPictureListItem";
import PageHeader from "@/components/header/PageHeader";
import DynamicAvatar from "@/components/ui/DynamicAvatar";
import SampleImageList from "@/data/imagelistsample";
import useGuestContext from "@/hooks/useGuestContext";
import useTheme from "@/hooks/useTheme";

export default function MyPicturesScreen() {
  const { getVarColor } = useTheme();

  const { guestInfo } = useGuestContext();

  const scrollY = useRef(new Animated.Value(0)).current;
  const measureHeight = useRef(0);

  const scrollYClamped = Animated.diffClamp(scrollY, 0, measureHeight.current);

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, measureHeight.current],
    outputRange: [0, -measureHeight.current],
  });

  const onLayout = (e: LayoutChangeEvent) => {
    if (measureHeight.current === 0) {
      console.log("measureHeight", e.nativeEvent.layout.height);
      measureHeight.current = e.nativeEvent.layout.height;
    }
  };

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: scrollY },
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  return (
    <SafeAreaView className="h-full flex items-center justify-center">
      <Animated.View
        className="absolute w-full left-0 top-0"
        style={{ zIndex: 1, transform: [{ translateY }] }}
      >
        <PageHeader
          onLayout={onLayout}
          right={
            <DynamicAvatar
              size={14}
              name={guestInfo.name}
              imageUri={guestInfo.avatar}
            />
          }
        />
      </Animated.View>

      <StatusBar
        style="light"
        backgroundColor={getVarColor("--color-primary-default")}
      />
      <Animated.FlatList
        style={{ paddingTop: measureHeight.current }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="flex-1 w-full h-full "
        data={SampleImageList}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <MyPictureListItem item={item} />}
      />
    </SafeAreaView>
  );
}
