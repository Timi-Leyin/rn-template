import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import NativeText from "@/components/ui/native-text";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import globalStyles from "@/components/styles/global-styles";
import THEME, { COLORS, TYPOGRAPHY } from "@/config/theme";
import NativeButton from "@/components/ui/native-button";

const Onboarding = () => {
  const router = useRouter();
  const scheme = useColorScheme() || "dark";
  return (
    <SafeAreaView style={globalStyles.wrapper}>
      <LinearGradient colors={["#EEFFFE", "#E7FFEB"]} style={{ flex: 1 }}>
        <View style={{ padding: 20, flex: 1, justifyContent: "space-between" }}>
          <View>
            {
              <Image
                style={{
                  width: "70%",
                  height: 300,
                  marginHorizontal: "auto",
                  objectFit: "contain",
                }}
                source={require("@/assets/images/onboarding/1.png")}
              />
            }
          </View>

          <View style={{ flex: 1 }}>
            <View style={styles.typography}>
              <NativeText weight="bold" style={[styles.title, styles.text]}>
                See Every Moment Come to Life
              </NativeText>
              <NativeText style={styles.text}>
                From weddings to casual gatherings, plan, organize, and bring
                every event to life.
              </NativeText>
            </View>

            <View>
              <View style={styles.btn}>
                <NativeButton text={"Create an Account"} mode="fill" />
                <NativeButton text={"Login"} mode="outline" />
              </View>

              <View>
                <NativeText style={styles.text}>
                  By creating an account, you agree to our Terms & Conditions &
                  Privacy Policy
                </NativeText>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

{
  /* <Pressable
onPress={() => {
  router.navigate("/home");
}}
>
</Pressable> */
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },

  btn: {
    gap: 20,
    marginVertical: 20,
  },

  text: {
    textAlign: "center",
    color: "#000",
  },

  title: {
    fontSize: TYPOGRAPHY.big,
  },

  typography: {
    gap: 10,
  },
});

export default Onboarding;
