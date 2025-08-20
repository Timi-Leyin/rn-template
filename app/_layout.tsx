import { ThemeProvider } from "@/theme/theme-provider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import PopupProvider from "@/lib/popup/popup-provider";
import { ToastProvider } from "@/lib/toast";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "PlusJakartaSans-Regular": require("../assets/fonts/plus-jarkarta-sans/PlusJakartaSans-Regular.ttf"),
    "PlusJakartaSans-Medium": require("../assets/fonts/plus-jarkarta-sans/PlusJakartaSans-Medium.ttf"),
    "PlusJakartaSans-SemiBold": require("../assets/fonts/plus-jarkarta-sans/PlusJakartaSans-SemiBold.ttf"),
    "PlusJakartaSans-Bold": require("../assets/fonts/plus-jarkarta-sans/PlusJakartaSans-Bold.ttf"),
    "PlusJakartaSans-ExtraBold": require("../assets/fonts/plus-jarkarta-sans/PlusJakartaSans-ExtraBold.ttf"),
    "PlusJakartaSans-Light": require("../assets/fonts/plus-jarkarta-sans/PlusJakartaSans-Light.ttf"),
    "PlusJakartaSans-ExtraLight": require("../assets/fonts/plus-jarkarta-sans/PlusJakartaSans-ExtraLight.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PopupProvider>
        <ToastProvider>
          <ThemeProvider>
            <SafeAreaProvider>
              <Stack>
                <Stack.Screen name="(entry)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="(dashboard)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </SafeAreaProvider>
          </ThemeProvider>
        </ToastProvider>
      </PopupProvider>
    </GestureHandlerRootView>
  );
}
