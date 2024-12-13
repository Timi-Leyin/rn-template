import NativeText from "@/components/ui/native-text";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Oops!" }} />
      <NativeText>This screen doesn't exist.</NativeText>
    </SafeAreaView>
  );
}

