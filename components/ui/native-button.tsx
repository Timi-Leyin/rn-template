import React from "react";
import { Pressable, PressableProps, StyleSheet, ViewStyle } from "react-native";
import NativeText, { NativeTextProps } from "./native-text";
import { COLORS } from "@/config/theme";

export interface NativeButtonProps extends PressableProps {
  textOptions?: NativeTextProps;
  mode: "fill" | "outline" | "text";
  style?: ViewStyle;
  text: any;
}

const NativeButton = (props: NativeButtonProps) => {
  const { textOptions, mode, style, text, children, ...rest } = props;

  // Determine button styles based on mode
  let buttonStyle;
  switch (mode) {
    case "fill":
      buttonStyle = styles.fillButton;
      break;
    case "outline":
      buttonStyle = styles.outlineButton;
      break;
    case "text":
      buttonStyle = styles.textButton;
      break;
    default:
      buttonStyle = styles.textButton;
  }

  return (
    <Pressable style={[styles.button, buttonStyle, style]} {...rest}>
      {children || <NativeText {...textOptions}>{text}</NativeText>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 18,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  fillButton: {
    backgroundColor: COLORS.primary,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: "transparent",
  },
  textButton: {
    backgroundColor: "transparent",
  },
});

export default NativeButton;
