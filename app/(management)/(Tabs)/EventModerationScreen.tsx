import { router } from "expo-router";
import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ModerationListItem from "@/components/fragments/ListItems/ModerationListItem";
import PageHeader from "@/components/header/PageHeader";
import ThemeStatusBar from "@/components/ui/themed/ThemeStatusBar";
import ModerationImageList from "@/data/moderationtest-data";

export default function EventModerationScreen() {
  return (
    <SafeAreaView className="bg-light h-full ">
      <PageHeader
        handleInset={false}
        leftClick={() => {
          router.dismissAll();
        }}
        titlei18n="management-tab-moderation"
      />

      <ThemeStatusBar />

      <FlatList
        className="flex-1"
        data={ModerationImageList}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ModerationListItem item={item} />}
      ></FlatList>
    </SafeAreaView>
  );
}
