import { View, Text, TextProps, useColorScheme } from "react-native";
import React from "react";
import THEME, { THEME_KEY } from "@/config/theme";

export interface NativeTextProps extends TextProps {
  weight?: "light" | "regular" | "medium" | "semibold" | "bold";
}

const NativeText = (props: NativeTextProps) => {
  const { children, style, weight, ...rest } = props;
  const colorScheme: THEME_KEY = useColorScheme() || "light";
  const color = THEME[colorScheme].colors.white;
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
          color
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
