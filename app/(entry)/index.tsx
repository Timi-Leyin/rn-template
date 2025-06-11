import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NativeButton from "@/components/ui/native-button";
import { router } from "expo-router";

const OnboardingScreen = () => {
  return (
    <SafeAreaView>
      <Text>hey</Text>
      <NativeButton mode="fill" text={"GO"}  onPress={()=>{
        router.navigate("/home")
      }}  />
    </SafeAreaView>
  );
};

export default OnboardingScreen;
