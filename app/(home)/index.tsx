import {
  Pressable,
  Text,
} from "react-native";

import { toast } from "@/components/lib/toast-manager";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const Showw = () => {
    toast.show({
      title: "Swipe down to delete",
      position: "bottom",
      type: "info",
      // icon:require("@/assets/images/icon.png"),
      duration: 4000,
    });
  };
  return (
    <SafeAreaView>
      <Pressable onPress={Showw}>
        <Text>click me</Text>
      </Pressable>
    </SafeAreaView>
  );
}
