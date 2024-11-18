import { router } from "expo-router";
import React from "react";
import { Animated, PixelRatio, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MyPictureListItem from "@/components/fragments/ListItems/MyPictureListItem";
import PageHeader from "@/components/header/PageHeader";
import ThemeStatusBar from "@/components/ui/themed/ThemeStatusBar";
import SampleImageList from "@/data/imagelistsample";
import useImageViewer from "@/hooks/useImageViewer";

const ratio = PixelRatio.get();
export default function EventFeedScreen() {
  const { viewerVisible, showImageViewer, ImageModal } = useImageViewer();

  return (
    <>
      <SafeAreaView className="bg-light h-full ">
        <PageHeader
          handleInset={false}
          leftClick={() => {
            router.dismissAll();
          }}
          titlei18n="management-tab-feed"
        />
        <ThemeStatusBar backgroundColor={viewerVisible ? "transparent" : ""} />

        <Animated.FlatList
          ListFooterComponent={() => <View style={{ height: 42 * ratio }} />}
          //        onScroll={handleScroll}
          scrollEventThrottle={16}
          className="flex-1 w-full h-full "
          data={SampleImageList}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <MyPictureListItem
              onPictureClick={() => showImageViewer(item.uri)}
              item={item}
            />
          )}
        />
      </SafeAreaView>
      <ImageModal />
    </>
  );
}
