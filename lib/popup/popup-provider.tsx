import React, {
    createContext,
    ReactNode,
    useContext,
    useRef,
    useState,
} from "react";
import { Dimensions, Modal, StyleSheet, View } from "react-native";


type ShowProps = {
  content: ReactNode;
//   title?: string;
};

type PopupContextType = {
  show: (props: ShowProps) => void;
  hide: () => void;
};

const PopupContext = createContext<PopupContextType>({
  show: () => {},
  hide: () => {},
});

export const usePopup = () => useContext(PopupContext);

const { width } = Dimensions.get("window");

const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const info = useRef<ShowProps>({ content: null!});

  const show = ({ content }: ShowProps) => {
    info.current.content = content;
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  return (
    <PopupContext.Provider value={{ show, hide }}>
      {children}
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={hide}
      >
        <View style={styles.overlay}>
          <View style={styles.popup}>{info.current.content}</View>
        </View>
      </Modal>
    </PopupContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    width: width * 0.8,
    alignItems: "center",
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default PopupProvider;
