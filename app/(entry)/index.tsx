import { View } from "react-native";
import React from "react";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { Text } from "@/components/ui/text";

const Entry = () => {
  return (
    <View style={{ padding: 50 }}>
      <Text variant="heading">Entry</Text>
      <Button onPress={() => router.navigate("/home")}>
        <Text style={{ color: "white" }}>Dashboard</Text>
      </Button>
    </View>
  );
};

export default Entry;
