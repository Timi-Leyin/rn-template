import React from "react";
import { Platform, StyleSheet as RNStyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { useThemeColor } from "@/hooks/use-theme-color";
import { FONTS, LETTER_SPACING } from "@/theme/globals";
import { PlatformPressable } from "@react-navigation/elements";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import {
  Grid5 as HomeIcon,
  Clock as HistoryIcon,
  Box as ProductsIcon,
  Setting2 as SettingsIcon,
} from "iconsax-react-native";
import { useIsLargeScreen } from "@/hooks/use-screen";
import TabletLayout from "@/components/layouts/tablet-layout";

export default function TabLayout() {
  const primary = useThemeColor({}, "primary");
  const baseLabelStyle = {
    fontFamily: FONTS.REGULAR,
    letterSpacing: LETTER_SPACING,
  };
  const isLargeScreen = useIsLargeScreen();

  const getIconVariant = (focused: boolean) => (focused ? "Bulk" : "Linear");

  if (isLargeScreen) {
    return (
      <TabletLayout
        baseLabelStyle={baseLabelStyle}
        getIconVariant={getIconVariant}
      />
    );
  }

  // Default bottom tabs for phones
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primary,
        headerShown: false,
        tabBarButton: (props) => (
          <PlatformPressable
            {...props}
            onPressIn={(ev) => {
              if (process.env.EXPO_OS === "ios") {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
              props.onPressIn?.(ev);
            }}
          />
        ),
        tabBarBackground: () => {
          if (Platform.OS === "ios") {
            return (
              <BlurView
                tint="light"
                intensity={10}
                style={RNStyleSheet.absoluteFill}
              />
            );
          }
          return null;
        },
        tabBarStyle: Platform.select({
          ios: {
            maxWidth: 450,
            width: "100%",
            marginHorizontal: "auto",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Dashboard",
          tabBarLabelStyle: baseLabelStyle,
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon
              variant={getIconVariant(focused)}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarLabelStyle: baseLabelStyle,
          tabBarIcon: ({ color, focused }) => (
            <HistoryIcon
              variant={getIconVariant(focused)}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Products",
          tabBarLabelStyle: baseLabelStyle,
          tabBarIcon: ({ color, focused }) => (
            <ProductsIcon
              variant={getIconVariant(focused)}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabelStyle: baseLabelStyle,
          tabBarIcon: ({ color, focused }) => (
            <SettingsIcon
              variant={getIconVariant(focused)}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
