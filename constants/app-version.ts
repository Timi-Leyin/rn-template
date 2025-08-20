import Constants from "expo-constants";
import { Platform } from "react-native";

export const APP_VERSION = Platform.select({
  ios: parseInt(String(Constants.expoConfig?.ios?.buildNumber)),
  android: Number(Constants.expoConfig?.android?.versionCode),
});

export const VERSION = Constants.expoConfig?.version;