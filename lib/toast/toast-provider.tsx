import React, { createContext, ReactNode, useContext, useState } from "react";
import { View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast, { ToastType } from "./toast";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<ToastItem, "id">) => void;
  showSuccess: (title: string, message?: string, duration?: number) => void;
  showError: (title: string, message?: string, duration?: number) => void;
  showWarning: (title: string, message?: string, duration?: number) => void;
  showInfo: (title: string, message?: string, duration?: number) => void;
  dismissToast: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts = 3,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const { top } = useSafeAreaInsets();

  const generateId = () => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const showToast = (toast: Omit<ToastItem, "id">) => {
    const newToast: ToastItem = {
      ...toast,
      id: generateId(),
    };

    setToasts((prev) => {
      const updatedToasts = [newToast, ...prev];
      // Limit the number of toasts
      return updatedToasts.slice(0, maxToasts);
    });
  };

  const showSuccess = (title: string, message?: string, duration?: number) => {
    showToast({ type: "success", title, message, duration });
  };

  const showError = (title: string, message?: string, duration?: number) => {
    showToast({ type: "error", title, message, duration });
  };

  const showWarning = (title: string, message?: string, duration?: number) => {
    showToast({ type: "warning", title, message, duration });
  };

  const showInfo = (title: string, message?: string, duration?: number) => {
    showToast({ type: "info", title, message, duration });
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const dismissAll = () => {
    setToasts([]);
  };

  const containerStyle: ViewStyle = {
    position: "absolute",
    top: top,
    left: 0,
    right: 0,
    zIndex: 9999,
    pointerEvents: "box-none",
  };

  const contextValue: ToastContextType = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    dismissToast,
    dismissAll,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <View style={containerStyle}>
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            id={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            duration={toast.duration}
            onDismiss={dismissToast}
            index={index}
          />
        ))}
      </View>
    </ToastContext.Provider>
  );
};
