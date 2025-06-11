import React from "react";
import { Pressable, PressableProps, StyleSheet, ViewStyle, ActivityIndicator } from "react-native";
import { Link, Href } from "expo-router";
import NativeText, { NativeTextProps } from "./native-text";
import { COLORS } from "@/constants/theme";

export interface NativeButtonProps extends PressableProps {
  textOptions?: NativeTextProps;
  mode: "fill" | "outline" | "text";
  style?: ViewStyle;
  text: any;
  href?: Href;
  isLoading?: boolean;
  loadingText?: string;
}

const NativeButton = (props: NativeButtonProps) => {
  const { 
    textOptions, 
    mode, 
    style, 
    text, 
    children, 
    href, 
    isLoading = false, 
    loadingText,
    disabled,
    ...rest 
  } = props;

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

  // Determine if button should be disabled
  const isDisabled = disabled || isLoading;

  // Button content with loading state
  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <ActivityIndicator 
            size="small" 
            color={mode === "fill" ? "#fff" : COLORS.primary} 
            style={styles.loadingIndicator}
          />
          {loadingText && (
            <NativeText 
              {...textOptions} 
              style={[
                textOptions?.style,
                { color: mode === "fill" ? "#fff" : COLORS.primary }
              ]}
            >
              {loadingText}
            </NativeText>
          )}
        </>
      );
    }
    
    return children || (
      <NativeText 
        {...textOptions}
        style={[
          textOptions?.style,
          { color: mode === "fill" ? "#fff" : COLORS.primary }
        ]}
      >
        {text}
      </NativeText>
    );
  };

  // If href is provided, wrap in Link component
  if (href && !isDisabled) {
    return (
      <Link href={href} asChild>
        <Pressable 
          style={[
            styles.button, 
            buttonStyle, 
            isDisabled && styles.disabledButton,
            style
          ]} 
          disabled={isDisabled}
          {...rest}
        >
          {renderContent()}
        </Pressable>
      </Link>
    );
  }

  return (
    <Pressable 
      style={[
        styles.button, 
        buttonStyle, 
        isDisabled && styles.disabledButton,
        style
      ]} 
      disabled={isDisabled}
      {...rest}
    >
      {renderContent()}
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
    flexDirection: "row",
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
  disabledButton: {
    opacity: 0.6,
  },
  loadingIndicator: {
    marginRight: 8,
  },
});

export default NativeButton;
