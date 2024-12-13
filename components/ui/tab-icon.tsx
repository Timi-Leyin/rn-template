import { COLORS } from "@/config/theme";
import * as Icon from "iconsax-react-native";
import { View } from "react-native";
import NativeText from "./native-text";

const TabIcon = ({ route, isFocused }: Props) => {
  const isCenter = route.includes("checklist");

  const renderIcon = (route: string, isFocused: boolean) => {
    const size = 25;
    const color = isCenter ? "#fff" : isFocused ? COLORS.primary : "#99A49B";
    switch (route) {
      case "home":
        return <Icon.Home size={size} color={color} />;

      case "event":
        return <Icon.Calendar size={size} color={color} />;

      case "checklist":
        return <Icon.Shop size={size} color={color} />;

      case "inbox":
        return <Icon.Message size={size} color={color} />;

      case "profile":
        return <Icon.User size={size} color={color} />;
    }
  };

  return (
    <View
      style={[
        {
          height: 70,
          width: 70,

          justifyContent: "center",
          gap: 3,
          alignItems: "center",
        },
        isCenter
          ? {
              borderRadius: 50,
              width: 60,
              height: 60,
              backgroundColor: COLORS.primary,
            }
          : undefined,
      ]}
    >
      {renderIcon(route, isFocused)}
      {!isCenter && (
        <NativeText
          style={{
            color: isFocused ? COLORS.primary : "#99A49B",
          }}
        >
          {route}
        </NativeText>
      )}
    </View>
  );
};

export default TabIcon;

interface Props {
  route: string;
  isFocused: boolean;
}
