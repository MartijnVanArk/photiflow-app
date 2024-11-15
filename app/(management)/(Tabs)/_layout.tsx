// write a main tabs layout for the management app

import {
  BottomTabSceneInterpolatedStyle,
  BottomTabSceneInterpolationProps,
  TransitionSpec,
} from "@react-navigation/bottom-tabs/src/types";
import { Tabs } from "expo-router"; // expo-router
import { useTranslation } from "react-i18next"; // react-i18next
import { Dimensions } from "react-native";

import Tabbar from "@/components/ui/tabs/Tabbar";
import useTheme from "@/hooks/useTheme";

export default function TabLayout() {
  const { t } = useTranslation();

  const { getVarColor } = useTheme();

  const { width: winWidth } = Dimensions.get("window");

  function forShift({
    current,
  }: BottomTabSceneInterpolationProps): BottomTabSceneInterpolatedStyle {
    return {
      sceneStyle: {
        // opacity: current.progress.interpolate({
        //   inputRange: [-1, 0, 1],
        //   outputRange: [0, 1, 0],
        // }),
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [-winWidth, 0, winWidth],
            }),
          },
        ],
      },
    };
  }

  const ShiftSpec: TransitionSpec = {
    animation: "spring",
    config: {
      bounciness: 12,

      //      stiffness: 10,
      ///      duration: 150,
      //  easing: Easing.inOut(Easing.ease),
    },
  };

  return (
    <Tabs
      tabBar={(props) => <Tabbar {...props} />}
      initialRouteName="EventSettingsScreen"
      screenOptions={{
        transitionSpec: ShiftSpec,
        sceneStyleInterpolator: forShift,
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
