import React, { PropsWithChildren, useRef } from "react";
import { Keyboard, View } from "react-native";
//@ts-expect-error we have bno type defs
import * as TextInputState from "react-native/Libraries/Components/TextInput/TextInputState";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function KeyboardDismisWrappable({
  children,
}: PropsWithChildren) {
  const isTargetTextInput = useRef(false);

  const tap = Gesture.Tap()
    .onEnd(() => {
      if (!isTargetTextInput.current) {
        Keyboard.dismiss();
      }
    })
    .runOnJS(true);

  return (
    <GestureDetector gesture={tap}>
      <View
        className="flex-1"
        accessible={false}
        onStartShouldSetResponderCapture={(e) => {
          isTargetTextInput.current = TextInputState.isTextInput(e.target);
          return false;
        }}
      >
        {children}
      </View>
    </GestureDetector>
  );
}
