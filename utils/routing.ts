import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs/src/types";
import { NavigationHelpers, ParamListBase } from "@react-navigation/native";
import { NavigationState } from "@react-navigation/native";

export const getStateRoutePart = (state: NavigationState): string => {
  return state.routes[state.index].name;
};

export const tryGetNavPath = (
  nav: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>,
): string => {
  const path: string[] = [];

  const proc = (
    nav: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>,
  ) => {
    path.push(getStateRoutePart(nav.getState()));

    const parent = nav.getParent();
    if (parent) {
      proc(parent);
    }
  };

  proc(nav);

  console.log("Try Get Nav Path : ", nav.getState());

  return "/" + path.reverse().join("/");
};
