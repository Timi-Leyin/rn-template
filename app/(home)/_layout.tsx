import React from "react";
import { withLayoutContext } from "expo-router";
import {
  createNativeBottomTabNavigator,
  NativeBottomTabNavigationOptions,
  NativeBottomTabNavigationEventMap,
} from "@bottom-tabs/react-navigation";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";

const BottomTabNavigator = createNativeBottomTabNavigator().Navigator;

const Tabs = withLayoutContext<
  NativeBottomTabNavigationOptions,
  typeof BottomTabNavigator,
  TabNavigationState<ParamListBase>,
  NativeBottomTabNavigationEventMap
>(BottomTabNavigator);

export default function TabLayout() {
  return (
    <Tabs 
      hapticFeedbackEnabled 
      translucent
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: () => ({ sfSymbol: "circle.grid.2x2.fill" }),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: () => ({ sfSymbol: "safari.fill" }),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          tabBarBadge: "3",
          title: "Settings",
          tabBarIcon: () => ({ sfSymbol: "gear" }),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: () => ({ sfSymbol: "person.circle.fill" }),
        }}
      />
    </Tabs>
  );
}
