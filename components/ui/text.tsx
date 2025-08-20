import { useThemeColor } from "@/hooks/use-theme-color";
import { FONT_SIZE, FONTS, LETTER_SPACING } from "@/theme/globals";
import React, { forwardRef } from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";

type TextVariant =
  | "body"
  | "title"
  | "subtitle"
  | "caption"
  | "heading"
  | "link";

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  lightColor?: string;
  darkColor?: string;
  children: React.ReactNode;
}

export const Text = forwardRef<RNText, TextProps>(
  (
    { variant = "body", lightColor, darkColor, style, children, ...props },
    ref
  ) => {
    const textColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "text"
    );
    const mutedColor = useThemeColor({}, "textMuted");

    const getTextStyle = (): TextStyle => {
      const baseStyle: TextStyle = {
        color: textColor,
        fontFamily: FONTS.REGULAR,
        letterSpacing: LETTER_SPACING,
      };

      switch (variant) {
        case "heading":
          return {
            ...baseStyle,
            fontSize: 28,
            fontFamily: FONTS.BOLD,
          };
        case "title":
          return {
            ...baseStyle,
            fontSize: 24,
            fontFamily: FONTS.BOLD,
          };
        case "subtitle":
          return {
            ...baseStyle,
            fontSize: 19,
            fontFamily: FONTS.SEMI_BOLD,
          };
        case "caption":
          return {
            ...baseStyle,
            fontSize: FONT_SIZE,
            fontFamily: FONTS.REGULAR,
            color: mutedColor,
          };
        case "link":
          return {
            ...baseStyle,
            fontSize: FONT_SIZE,
            fontFamily: FONTS.MEDIUM,
            textDecorationLine: "underline",
          };
        default: // 'body'
          return {
            ...baseStyle,
            fontSize: FONT_SIZE,
            fontFamily: FONTS.REGULAR,
          };
      }
    };

    return (
      <RNText
        allowFontScaling={false}
        ref={ref}
        style={[getTextStyle(), style]}
        {...props}
      >
        {children}
      </RNText>
    );
  }
);
Text.displayName = "Text";
