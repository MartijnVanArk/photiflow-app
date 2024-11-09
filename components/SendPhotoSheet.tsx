import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetViewProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { Image, View } from "react-native";

import usePictureContext from "@/hooks/usePictureContext";
import useTheme from "@/hooks/useTheme";

import InputControl from "./ui/InputControl";
import ThemeButton from "./ui/ThemeButton";

export interface SendPhotoSheetProps
  extends Omit<BottomSheetViewProps, "children"> {
  test: boolean;
}

const SendPhotoSheet = forwardRef<BottomSheet, BottomSheetViewProps>(
  ({ children, ...props }, sheetRef) => {
    const handleSheetChanges = useCallback((index: number) => {
      console.log("handleSheetChanges", index);
    }, []);

    const { getVarColor } = useTheme();
    const { pictureState } = usePictureContext();

    const internalSheetRef = useRef<BottomSheet>(null);

    useImperativeHandle(
      sheetRef,
      () => internalSheetRef.current as BottomSheet,
    );

    const sendClick = useCallback(() => {
      if (sheetRef && internalSheetRef.current) {
        internalSheetRef.current.close();
      }
    }, []);

    return (
      <BottomSheet
        ref={internalSheetRef}
        enablePanDownToClose={true}
        snapPoints={["85%"]}
        index={-1}
        handleStyle={{
          backgroundColor: getVarColor("--color-light-sec-default"),
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
        maxDynamicContentSize={100}
        handleIndicatorStyle={{
          backgroundColor: getVarColor("--color-text-secondary"),
        }}
        onChange={handleSheetChanges}
      >
        <BottomSheetView className="h-full p-8 flex gap-4 justify-between bg-lightsec">
          <View>
            <InputControl
              placeholder="Ënter your name"
              icon={{ name: "account" }}
            />
            <InputControl
              placeholder="Optionally add a comment"
              icon={{ name: "comment-edit-outline" }}
            />
          </View>

          <Image
            className="flex-1 border-4 overflow-hidden border-primary"
            style={{ borderRadius: 24 }}
            source={{ uri: pictureState.lastPicture?.uri }}
          />

          <ThemeButton
            onPress={sendClick}
            className="w-full py-8"
            variant="primary"
            title="Send Picture"
            textSize="text-2xl"
            iconRight={{ name: "send", size: 36 }}
          ></ThemeButton>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);
SendPhotoSheet.displayName = "SendPhotoSheet";

export default SendPhotoSheet;
