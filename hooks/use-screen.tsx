import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export const useIsLargeScreen = () => {
  const [isLarge, setIsLarge] = useState(Dimensions.get("window").width >= 768);
  useEffect(() => {
    const onChange = ({ window }: { window: { width: number } }) => {
      setIsLarge(window.width >= 768);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => {
      if (typeof subscription?.remove === "function") {
        subscription.remove();
      }
    };
  }, []);
  return isLarge;
};
