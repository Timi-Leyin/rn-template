import { View, Text, Pressable, SafeAreaView } from "react-native";
import React from "react";
import NativeText from "@/components/ui/native-text";
import { useRouter } from "expo-router";

const Onboarding = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Text>Onboarding</Text>
      <Pressable
        onPress={() => {
          router.navigate("/home");
        }}
      >
        <NativeText>Go Home</NativeText>
      </Pressable>
    </SafeAreaView>
  );
};

export default Onboarding;
