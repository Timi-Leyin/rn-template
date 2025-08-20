import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useThemeColor, useThemeColors } from "@/hooks/use-theme-color";
import { CORNERS, FONT_SIZE, FONTS } from "@/theme/globals";
import * as Haptics from "expo-haptics";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  X,
  XCircle,
} from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { Dimensions, Platform, Pressable, ViewStyle } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TOAST_HEIGHT = 72;
const TOAST_MARGIN = 16;

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onDismiss: (id: string) => void;
  index: number;
}

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 4000,
  onDismiss,
  index,
}) => {
  const { textMuted } = useThemeColors();
  const backgroundColor = useThemeColor({}, "card");
  const foregroundColor = useThemeColor({}, "cardForeground");
  const successColor = useThemeColor({}, "green");
  const errorColor = useThemeColor({}, "red");
  const warningColor = useThemeColor({}, "orange");
  const infoColor = useThemeColor({}, "blue");

  const translateY = useSharedValue(-200);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Get icon and color based on type
  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircle2,
          color: successColor,
          backgroundColor: `${successColor}15`,
        };
      case "error":
        return {
          icon: XCircle,
          color: errorColor,
          backgroundColor: `${errorColor}15`,
        };
      case "warning":
        return {
          icon: AlertCircle,
          color: warningColor,
          backgroundColor: `${warningColor}15`,
        };
      case "info":
        return {
          icon: Info,
          color: infoColor,
          backgroundColor: `${infoColor}15`,
        };
    }
  };

  const config = getToastConfig();

  // Auto dismiss timer
  const startDismissTimer = () => {
    if (duration > 0) {
      timeoutRef.current = setTimeout(() => {
        handleDismiss();
      }, duration);
    }
  };

  const clearDismissTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  };

  const handleDismiss = () => {
    clearDismissTimer();

    // Haptic feedback
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // Animate out
    translateX.value = withTiming(SCREEN_WIDTH, { duration: 300 });
    opacity.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(onDismiss)(id);
    });
  };

  // Pan gesture handler for swipe to dismiss
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number }
  >({
    onStart: (_, context) => {
      context.startX = translateX.value;
      runOnJS(clearDismissTimer)();
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
    onEnd: (event) => {
      const shouldDismiss = Math.abs(event.translationX) > SCREEN_WIDTH * 0.3;

      if (shouldDismiss) {
        translateX.value = withTiming(
          event.translationX > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH,
          { duration: 200 },
        );
        opacity.value = withTiming(0, { duration: 200 }, () => {
          runOnJS(onDismiss)(id);
        });
      } else {
        translateX.value = withSpring(0, {
          damping: 20,
          stiffness: 300,
        });
        runOnJS(startDismissTimer)();
      }
    },
  });

  // Entry animation
  useEffect(() => {
    const delay = index * 100; // Stagger multiple toasts

    setTimeout(() => {
      translateY.value = withSpring(TOAST_MARGIN + index * (TOAST_HEIGHT + 8), {
        damping: 20,
        stiffness: 300,
      });
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 400,
      });
    }, delay);

    startDismissTimer();

    return () => {
      clearDismissTimer();
    };
  }, [index]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  const toastStyle: ViewStyle = {
    position: "absolute",
    top: 0,
    left: TOAST_MARGIN,
    right: TOAST_MARGIN,
    height: TOAST_HEIGHT,
    backgroundColor: backgroundColor,
    borderRadius: CORNERS + 4,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 1000 + index,

    // Glassmorphism effect
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  };

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[toastStyle, animatedStyle]}>
        {/* Icon background */}
        <Animated.View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: config.backgroundColor,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <Icon name={config.icon} size={20} color={config.color} />
        </Animated.View>

        {/* Content */}
        <Animated.View style={{ flex: 1, marginRight: 8 }}>
          <Text
            style={{
              fontSize: FONT_SIZE + 1,
              fontFamily: FONTS.SEMI_BOLD,
              color: foregroundColor,
              marginBottom: message ? 2 : 0,
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
          {message && (
            <Text
              style={{
                fontSize: FONT_SIZE - 1,
                fontFamily: FONTS.REGULAR,
                color: textMuted,
                lineHeight: 16,
              }}
              numberOfLines={2}
            >
              {message}
            </Text>
          )}
        </Animated.View>

        {/* Close button */}
        <Pressable
          onPress={handleDismiss}
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: `${foregroundColor}10`,
          }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon name={X} size={14} color={useThemeColor({}, "textMuted")} />
        </Pressable>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Toast;
