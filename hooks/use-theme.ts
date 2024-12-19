import THEME from "@/config/theme";
import { useColorScheme } from "react-native";

export default () => {
  const scheme = useColorScheme() || "light";

  return THEME[scheme];
};
