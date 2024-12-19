import { TextStyle, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import NativeText, { NativeTextWeight } from "./native-text";

type ThemedViewProps = {
  children?: ReactNode;
} & ViewStyle;

const ThemedView = ({ children, ...rest }: ThemedViewProps) => {
  return <View style={rest}>{children}</View>;
};

type ThemedTextProps = {
  children: ReactNode;
  weight?: NativeTextWeight;
} & TextStyle;

export const ThemedText = ({ children, weight, ...rest }: ThemedTextProps) => {
  return (
    <NativeText weight={weight} style={rest}>
      {children}
    </NativeText>
  );
};

export default ThemedView;
