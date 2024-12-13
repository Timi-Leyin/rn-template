import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabIcon from "./tab-icon";
import { usePathname } from "expo-router";

const BottomNav = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();
  const pathname = usePathname();
  const arranged = [];
  arranged.push(state.routes[0]);
  arranged.push(state.routes[1]);
  arranged.push(state.routes[4]);
  arranged.push(state.routes[2]);
  arranged.push(state.routes[3]);

  

  return (
    <View
      style={[
        styles.container,
        {
          marginBottom: Platform.OS === "ios" ? bottom : 10,
        },
      ]}
    >
      {arranged?.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = pathname.includes(route.name);

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, { merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            // testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            <View style={{ width: "auto" }}>
              <TabIcon route={route.name} isFocused={isFocused} />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    justifyContent: "space-evenly",
    alignItems: "center",
    // borderRadius: 50,
    marginHorizontal: "auto",
    flexDirection: "row",
    width: "100%",
  },
  tab: {},
});

export default BottomNav;
