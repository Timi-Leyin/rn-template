import { View, Text, TextProps, useColorScheme } from "react-native";
import React from "react";
import THEME, { THEME_KEY } from "@/config/theme";
import useTheme from "@/hooks/use-theme";

export type NativeTextWeight =
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold";
export interface NativeTextProps extends TextProps {
  weight?: NativeTextWeight;
}

const NativeText = (props: NativeTextProps) => {
  const { children, style, weight, ...rest } = props;
  const theme = useTheme();
  const color = theme.colors.white;
  let fontFamily: string;
  switch (weight) {
    case "light":
      fontFamily = "Quicksand_300Light";
      break;

    case "regular":
      fontFamily = "Quicksand_400Regular";
      break;

    case "medium":
      fontFamily = "Quicksand_500Medium";
      break;

    case "semibold":
      fontFamily = "Quicksand_600SemiBold";
      break;

    case "bold":
      fontFamily = "Quicksand_700Bold";
      break;

    default:
      fontFamily = "Quicksand_500Medium";
      break;
  }
  return (
    <Text
      style={[
        {
          fontFamily,
          color,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default NativeText;
