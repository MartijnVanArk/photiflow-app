import React, { Dispatch, SetStateAction } from "react";
import {
  FlatList,
  PixelRatio,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";

import ThemeText from "./ThemeText";

const NumPadButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "<"];

const ratio = PixelRatio.get();

export interface PinNumPadProps extends ViewProps {
  wantLength?: number;
  padEnabled?: boolean;
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}

export default function PinNumPad({
  wantLength = 6,
  padEnabled = true,
  code,
  setCode,
  ...props
}: PinNumPadProps) {
  return (
    <View {...props}>
      <FlatList
        data={NumPadButtons}
        numColumns={3}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            disabled={item === "" || !padEnabled}
            className={`flex items-center justify-center m-1`}
            style={{
              opacity: padEnabled ? 1 : 0.3,
            }}
            onPress={() => {
              if (item === "<") {
                setCode(code.slice(0, -1));
              } else {
                setCode(code + item);
              }
            }}
          >
            <View
              className={`flex items-center justify-center rounded-full border-textsecondary ${item !== "" ? "border" : ""}`}
              style={{
                width: 32 * ratio,
                height: 32 * ratio,
              }}
            >
              <ThemeText className="mt-1 text-3xl">
                {item === "<" ? "⌫" : item}
              </ThemeText>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
}
