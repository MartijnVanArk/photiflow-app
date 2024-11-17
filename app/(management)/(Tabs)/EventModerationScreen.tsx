import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ModerationListItem from "@/components/fragments/ListItems/ModerationListItem";
import PageHeader from "@/components/header/PageHeader";
import ModerationImageList from "@/data/moderationtest-data";
import useTheme from "@/hooks/useTheme";

export default function EventModerationScreen() {
  const { getVarColor } = useTheme();

  return (
    <SafeAreaView className="bg-light h-full ">
      <PageHeader
        handleInset={false}
        leftClick={() => {
          router.dismissAll();
        }}
        titlei18n="management-tab-moderation"
      />
      <StatusBar
        hidden={false}
        style="light"
        backgroundColor={getVarColor("--color-primary-default")}
      />
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
