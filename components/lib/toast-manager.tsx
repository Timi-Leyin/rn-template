import React, { useState, useEffect, ReactNode, Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  PanResponder,
} from "react-native";
import * as Icon from "iconsax-react-native";

interface ToastConfig {
  position?: "top" | "center" | "bottom";
  duration?: number;
  stack?: boolean;
}
interface ToastOptions extends ToastConfig {
  id: string;
  title: string;
  icon?: any;
  type?: "success" | "info" | "error";
}

class ToastManager {
  private static instance: ToastManager;
  private showToastCallback: ((options: ToastOptions) => void) | null = null;

  private constructor() {}

  static getInstance() {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  setShowToastCallback(callback: (options: ToastOptions) => void) {
    this.showToastCallback = callback;
  }

  show(options: Omit<ToastOptions, "id">) {
    if (this.showToastCallback) {
      this.showToastCallback({ ...options, id: Math.random().toString(36) });
    } else {
      console.warn("ToastManager: No toast callback registered.");
    }
  }
}

export const toast = ToastManager.getInstance();

export const ToastProvider: React.FC<{
  children: React.ReactNode;
  config?: ToastConfig;
}> = ({ children, config }) => {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);
  const [fadeAnims, setFadeAnims] = useState<Animated.Value[]>([]);
  const [currentToastIndex, setCurrentToastIndex] = useState(0); // For swipe browsing

  useEffect(() => {
    toast.setShowToastCallback((options) => {
      if (!options.stack) {
        // Clear all current toasts if stack is false
        setToasts([]);
        setFadeAnims([]);
      }

      const newToast = { 
        ...options ,
        ...config,
      
      };
      const newFadeAnim = new Animated.Value(0);

      setToasts((prev) => [...prev, newToast]);
      setFadeAnims((prev) => [...prev, newFadeAnim]);

      // Start animation for the new toast
      Animated.timing(newFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Remove the toast after the specified duration
      setTimeout(() => {
        hideToast(newToast.id);
      }, options.duration || 3000);
    });
  }, []);

  const hideToast = (id: string) => {
    const index = toasts.findIndex((toast) => toast.id === id);
    if (index >= 0) {
      Animated.timing(fadeAnims[index], {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
        setFadeAnims((prev) => prev.filter((_, i) => i !== index));
        if (currentToastIndex >= toasts.length - 1) {
          setCurrentToastIndex((prev) => Math.max(0, prev - 1));
        }
      });
    }
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) =>
      Math.abs(gestureState.dy) > 20,
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 0) {
        // Swiped down
        hideToast(toasts[currentToastIndex]?.id);
      } else if (gestureState.dy < 0) {
        // Swiped up
        setCurrentToastIndex((prev) =>
          prev < toasts.length - 1 ? prev + 1 : prev
        );
      }
    },
  });

  return (
    <>
      {children}
      {toasts.map((toast, index) => {
        const isVisible = index === currentToastIndex;

        return (
          <Animated.View
            {...(isVisible ? panResponder.panHandlers : {})}
            key={toast.id}
            style={[
              styles.toastContainer,
              toast.position === "top" && styles.top,
              toast.position === "center" && styles.center,
              toast.position === "bottom" && styles.bottom,
              {
                opacity: fadeAnims[index],
                transform: [
                  { translateY: isVisible ? 0 : -20 },
                  { scale: isVisible ? 1 : 0.95 },
                ],
                zIndex: isVisible ? 1000 : 999 - index,
              },
            ]}
          >
            <View>
              {toast.icon ? (
                <Fragment>
                  <Image style={styles.icon} source={toast.icon} />
                </Fragment>
              ) : (
                <Fragment>
                  {!toast.type ||
                    (toast.type == "info" && (
                      <Icon.InfoCircle variant="Bulk" color="#000" />
                    ))}
                  {toast.type == "error" && (
                    <Icon.CloseCircle variant="Bulk" color="red" />
                  )}
                  {toast.type == "success" && (
                    <Icon.TickCircle variant="Bulk" color="green" />
                  )}
                </Fragment>
              )}
            </View>
            <Text style={styles.toastText}>{toast.title}</Text>
          </Animated.View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  toastContainer: {
    position: "absolute",
    left: 20,
    right: 20,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#eee",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 20,
    alignItems: "center",
    gap: 15,
    minWidth: 200,
    maxWidth: "100%",
  },
  toastText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  top: { top: 50 },
  center: { top: "50%", transform: [{ translateY: -50 }] },
  bottom: { bottom: 50 },
});
