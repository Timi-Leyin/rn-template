import { Pressable, Text } from "react-native";

import { toast } from "@/components/lib/toast-manager";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const Showw = () => {
    toast.show({
      title: "Swipe down to delete",
      type: "error",
      stack:true,
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
