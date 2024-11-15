// write a main tabs layout for the management app

import { MaterialCommunityIcons } from "@expo/vector-icons"; // expo-vector-icons
import { Tabs } from "expo-router"; // expo-router
import { useTranslation } from "react-i18next"; // react-i18next

import Tabbar from "@/components/ui/tabs/Tabbar";
import useTheme from "@/hooks/useTheme";

export default function TabLayout() {
  const { t } = useTranslation();

  const { getVarColor } = useTheme();

  return (
    <Tabs
      tabBar={(props) => <Tabbar {...props} />}
      initialRouteName="EventSettingsScreen"
      screenOptions={{
        animation: "shift",
        sceneStyle: {
          backgroundColor: getVarColor("--color-light-default"),
        },
        headerShown: false,
        tabBarLabelPosition: "below-icon", // ios only
        tabBarStyle: {
          backgroundColor: getVarColor("--color-light-sec-default"),
          borderTopColor: getVarColor("--color-text-secondary"),
        },
      }}
    >
      <Tabs.Screen
        name="EventSettingsScreen"
        options={{
          title: t("management-tab-settings"),
        }}
      />
      <Tabs.Screen
        name="EventModerationScreen"
        options={{
          title: t("management-tab-moderation"),
        }}
      />
      <Tabs.Screen
        name="EventGalleryScreen"
        options={{
          title: t("management-tab-gallery"),
        }}
      />
    </Tabs>
  );
}
