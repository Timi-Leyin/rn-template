import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import NativeButton from "../../components/ui/native-button";
import NativeText from "@/components/ui/native-text";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <View style={styles.container}>
      <NativeText weight="semibold" style={styles.title}>Home</NativeText>
      <NativeText style={styles.subtitle}>
        Welcome to the home screen of the app
      </NativeText>

      <View style={styles.buttonContainer}>
        <NativeButton
          mode="fill"
          text="Go to Settings"
          href="/settings"
          style={styles.button}
        />
        <NativeButton
          mode="fill"
          text="Loading Demo"
          isLoading={isLoading}
          onPress={handleLoadingDemo}
          style={styles.button}
        />

        <NativeButton
          mode="text"
          text="Navigate to Profile"
          href="/profile"
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
  },
  button: {
    width: "100%",
  },
});
