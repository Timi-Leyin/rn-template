import React from "react";
import { View } from "react-native";
import { ScrollView } from "../ui/scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
  scrollEnabled?: boolean;
  inset?: boolean;
  wrappper?: boolean;
}
const Body = ({ children, scrollEnabled, inset, wrappper }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        scrollEnabled={scrollEnabled}
        style={{
          marginTop: inset ? insets.top : 0,
          marginBottom: inset ? insets.bottom : 0,
          paddingHorizontal: wrappper ? 16 : 0,
          flex: 1,
        }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default Body;
