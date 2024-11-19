import { router } from "expo-router";
import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ModerationListItem from "@/components/fragments/ListItems/ModerationListItem";
import PageHeader from "@/components/header/PageHeader";
import ThemeStatusBar from "@/components/ui/themed/ThemeStatusBar";
import ModerationImageList from "@/data/moderationtest-data";
import useImageViewer from "@/hooks/useImageViewer";
import useTheme from "@/hooks/useTheme";

export default function EventModerationScreen() {
  const { viewerVisibleFast, showImageViewer, ImageModal } = useImageViewer();

  const picClick = (uri: string) => {
    showImageViewer(uri);
  };

  const { getVarColor } = useTheme();

  return (
    <>
      <SafeAreaView
        className=" h-full "
        style={{ backgroundColor: getVarColor("--color-primary-default") }}
      >
        <PageHeader
          handleInset={false}
          leftClick={() => {
            router.dismissAll();
          }}
          titlei18n="management-tab-moderation"
        />

        <ThemeStatusBar
          backgroundColor={viewerVisibleFast ? "transparent" : ""}
        />

        <FlatList
          className="flex-1 bg-light"
          data={ModerationImageList}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ModerationListItem onPicClick={picClick} item={item} />
          )}
        ></FlatList>
      </SafeAreaView>
      <ImageModal />
    </>
  );
}
