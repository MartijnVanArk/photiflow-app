import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MyPictureListItem from "@/components/fragments/ListItems/MyPictureListItem";
import PageHeader from "@/components/header/PageHeader";
import DynamicAvatar from "@/components/ui/DynamicAvatar";
import SampleImageList from "@/data/imagelistsample";
import useGuestContext from "@/hooks/useGuestContext";
import useTheme from "@/hooks/useTheme";

export default function MyPicturesScreen() {
  const { getVarColor } = useTheme();

  const [headerVisible, setHeaderVisible] = React.useState(false);

  const { guestInfo } = useGuestContext();
  const barRef = useRef<View>(null);

  const scrollY = useRef(new Animated.Value(0)).current;
  const measureHeight = useRef(0);

  const scrollYClamped = Animated.diffClamp(scrollY, 0, measureHeight.current);

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

  useEffect(() => {
    barRef.current?.measureInWindow(
      (x: number, y: number, width: number, height: number) => {
        measureHeight.current = height;
      },
    );
    if (!headerVisible) setHeaderVisible(true);
  }, [barRef, headerVisible]);

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, measureHeight.current],
    outputRange: [0, -measureHeight.current],
  });

  console.log("rerender", measureHeight.current);

  return (
    <SafeAreaView className="h-full flex items-center justify-center">
      <Animated.View
        className="absolute w-full left-0 top-0"
        style={{ zIndex: 1, transform: [{ translateY }] }}
      >
        <PageHeader
          ref={barRef}
          //          onLayout={onLayout}
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
