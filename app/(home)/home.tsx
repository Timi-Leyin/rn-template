import { Pressable } from "react-native";

import { toast } from "@/components/lib/toast-manager";
import { SafeAreaView } from "react-native-safe-area-context";
import NativeText from "@/components/ui/native-text";

export default function HomeScreen() {
  const Showw = () => {
    toast.show({
      title: "Swipe down to delete",
      type: "error",
      stack: true,
    });
  };
  return (
    <SafeAreaView>
      <Pressable onPress={Showw}>
        <NativeText>click me</NativeText>
      </Pressable>
    </SafeAreaView>
  );
}
