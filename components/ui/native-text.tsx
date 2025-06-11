import { Text, TextProps } from "react-native";
import React from "react";
import { FONTS } from "@/constants/theme";

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

  const color = "#000";
  let fontFamily: string;
  switch (weight) {
    case "light":
      fontFamily = FONTS.LG();
      break;

    case "regular":
      fontFamily = FONTS.RG();
      break;

    case "medium":
      fontFamily = FONTS.MD();
      break;

    case "semibold":
      fontFamily = FONTS.SB();
      break;

    case "bold":
      fontFamily = FONTS.B();
      break;

    default:
      fontFamily = FONTS.RG();
      break;
  }
  return (
    <Text
      allowFontScaling={false}
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
