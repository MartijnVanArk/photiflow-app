import { useState, useEffect } from "react";
import { Keyboard, KeyboardEvent, Platform } from "react-native";

const isIOS = Platform.OS === "ios";
const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const handleKeyboardDidShow = (e: KeyboardEvent) => {
    setKeyboardHeight(e.endCoordinates.height);
  };
  const handleKeyboardDidHide = () => {
    setKeyboardHeight(0);
  };

  useEffect(() => {
    const showEvent = isIOS ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = isIOS ? "keyboardWillHide" : "keyboardDidHide";
    const showSubscription = Keyboard.addListener(
      showEvent,
      handleKeyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      hideEvent,
      handleKeyboardDidHide,
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return { keyboardHeight };
};

export default useKeyboardHeight;
