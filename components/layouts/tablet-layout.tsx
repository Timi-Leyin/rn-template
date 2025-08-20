import { View, TouchableOpacity, StyleSheet, TextStyle } from "react-native";
import React from "react";
import { FONTS } from "@/theme/globals";
import { Tabs, useRouter, useSegments } from "expo-router";
import {
  Grid5 as HomeIcon,
  Clock as HistoryIcon,
  Box as ProductsIcon,
  Setting2 as SettingsIcon,
  Logout as LogoutIcon,
} from "iconsax-react-native";
import { useThemeColors } from "@/hooks/use-theme-color";
import { Text } from "../ui/text";

interface Props {
  baseLabelStyle: TextStyle;
  getIconVariant: (focused: boolean) => "Bulk" | "Linear";
}
const SIDEBAR_TABS = [
  { name: "home", icon: HomeIcon, label: "Dashboard" },
  { name: "history", icon: HistoryIcon, label: "History" },
  { name: "products", icon: ProductsIcon, label: "Products" },
  { name: "settings", icon: SettingsIcon, label: "Settings" },
];
const TabletLayout = ({ baseLabelStyle, getIconVariant }: Props) => {
  const router = useRouter();
  const segments = useSegments();
  const { primary, background, border } = useThemeColors();
  const currentTab = segments[2] || "home";
  const handleLogout = () => {
    alert("Logged out!");
  };

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View
        style={[
          sidebarStyles.sidebar,
          {
            backgroundColor: background,
            borderRightColor: border,
          },
        ]}
      >
        <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
          {SIDEBAR_TABS.map((tab) => {
            const Icon = tab.icon;
            const focused = currentTab === tab.name;
            return (
              <TouchableOpacity
                key={tab.name}
                style={[
                  sidebarStyles.sidebarTab,
                  focused && { backgroundColor: primary + "22" },
                ]}
                onPress={() => {
                  if (currentTab !== tab.name) {
                    router.replace(`./${tab.name}`);
                  }
                }}
              >
                <Icon
                  variant={getIconVariant(focused)}
                  size={28}
                  color={focused ? primary : "#888"}
                />
                <Text
                  style={[
                    sidebarStyles.tabLabel,
                    {
                      color: focused ? primary : "#888",
                    },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={sidebarStyles.logoutContainer}>
          <View
            style={[
              sidebarStyles.logoutDivider,
              {
                backgroundColor: border,
              },
            ]}
          />
          <TouchableOpacity
            style={sidebarStyles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <LogoutIcon
              size={20}
              color="#e11d48"
              // style={{ marginRight: 8 }}
            />
            {/* <RNText style={sidebarStyles.logoutLabel}>Log out</RNText> */}
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {/* Render the current tab's content using Tabs */}
        <Tabs
          screenOptions={{
            tabBarStyle: { display: "none" }, // Hide bottom tab bar
            headerShown: false,
          }}
        >
          {/* ...Tabs.Screen components remain as before */}
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
      </View>
    </View>
  );
};

export default TabletLayout;

const sidebarStyles = StyleSheet.create({
  sidebar: {
    width: 90,
    borderRightWidth: 1,
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
  sidebarTab: {
    width: "90%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderRadius: 16,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 6,
  },
  logoutContainer: {
    width: "100%",
    alignItems: "center",
    // marginBottom: 12,
    marginTop: 8,
  },
  logoutDivider: {
    width: "80%",
    height: 1,
    marginBottom: 18,
    alignSelf: "center",
    borderRadius: 1,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    paddingTop: 10,
    borderRadius: 999,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  logoutLabel: {
    color: "#e11d48",
    fontSize: 15,
    fontFamily: FONTS.MEDIUM,
    letterSpacing: 0.2,
  },
});
