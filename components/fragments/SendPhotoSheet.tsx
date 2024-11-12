import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { BottomSheetViewProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types";
import { Image } from "expo-image";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { GuestActionTypes } from "@/actions/GuestActions";
import { PictureActionTypes } from "@/actions/PictureActions";
import useGuestContext from "@/hooks/useGuestContext";
import usePictureContext from "@/hooks/usePictureContext";
import useTheme from "@/hooks/useTheme";

import InputControl from "../ui/InputControl";
import TagInput from "../ui/TagInput";
import ThemeButton from "../ui/ThemeButton";

export interface SendPhotoSheetProps
  extends Omit<BottomSheetViewProps, "children"> {
  test: boolean;
}

const SendPhotoSheet = forwardRef<BottomSheet, BottomSheetViewProps>(
  ({ children, ...props }, sheetRef) => {
    // const handleSheetChanges = useCallback((index: number) => {
    // }, []);

    const { getVarColor } = useTheme();
    const { pictureState, pictureStateDispatch } = usePictureContext();

    const { guestInfo, guestInfoDispatch } = useGuestContext();

    const [guestName, setGuestName] = useState(guestInfo.name);
    const [comment, setComment] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const internalSheetRef = useRef<BottomSheet>(null);

    useImperativeHandle(
      sheetRef,
      () => internalSheetRef.current as BottomSheet,
    );

    const gnChange = (val: string) => {
      setGuestName(val);
    };
    const cmChange = (val: string) => {
      setComment(val);
    };

    const sendClick = useCallback(() => {
      if (sheetRef && internalSheetRef.current) {
        guestInfoDispatch({
          type: GuestActionTypes.UPDATENAME,
          payload: { name: guestName },
        });

        const payload = { name: guestName, comment: comment, tags: tags };

        pictureStateDispatch({
          type: PictureActionTypes.SET_PRE_UPLOAD_INFO,
          payload: payload,
        });

        //todo: make bae64 ?? and upload ? via commandcenter wich should set the final WAS_UPLOADED .. als o popup a modal waiting screen

        pictureStateDispatch({ type: PictureActionTypes.WAS_UPLOADED });
        internalSheetRef.current.close();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comment, guestName, tags]);

    const onNewTags = (tags: string[]) => {
      setTags(tags);
    };

    const { t } = useTranslation();

    const renderBackdrop = useCallback(
      (props: BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop
          enableTouchThrough={false}
          pressBehavior="close"
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={1}
        />
      ),
      [],
    );

    return (
      <BottomSheet
        backdropComponent={renderBackdrop}
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
        //        onChange={handleSheetChanges}
      >
        <BottomSheetView className="h-full p-8 flex gap-4 justify-between bg-lightsec">
          <View>
            <InputControl
              defaultValue={guestName}
              onChangeText={gnChange}
              placeholder={t("sendphoto-name-placeholder")}
              icon={{ name: "account" }}
            />
            <InputControl
              defaultValue={comment}
              onChangeText={cmChange}
              placeholder={t("sendphoto-comment-placeholder")}
              icon={{ name: "comment-edit-outline" }}
            />
            <TagInput
              placeholder={t("sendphoto-tags-placeholder")}
              tags={tags}
              onNewTags={onNewTags}
            />
          </View>

          <View className="flex-1 flex elevation-md rounded-xl overflow-hidden">
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{ uri: pictureState.lastPicture?.uri }}
            />
          </View>

          <ThemeButton
            onPress={sendClick}
            className="w-full py-8"
            variant="primary"
            title={t("sendphoto-sendbutton-title")}
            textSize="text-2xl"
            iconRight={{ name: "image-move", size: 36 }}
          ></ThemeButton>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);
SendPhotoSheet.displayName = "SendPhotoSheet";

export default SendPhotoSheet;
