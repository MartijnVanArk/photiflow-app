import BottomSheet from "@gorhom/bottom-sheet";
import { PortalHost } from "@gorhom/portal";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { PixelRatio, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { CCActionTypes } from "@/actions/CommandCenterActions";
import EventInfoNoPicture from "@/components/fragments/EventInfoNoPicuture";
import EventLastPictureView from "@/components/fragments/EventLastPictureView";
import EventPictureToolbar from "@/components/fragments/EventPictureToolbar";
import SendPhotoSheet from "@/components/fragments/SendPhotoSheet";
import KeyboardDismisWrappable from "@/components/KeyboardDismisWrappable";
import PopupMenu from "@/components/menus/PopupMenu";
import PopupMenuItem from "@/components/menus/PopupMenuItem";
import MutedBGPhoto from "@/components/ui/MutedBGPhoto";
import SimpleIconButton from "@/components/ui/SimpleIconButton";
import { images } from "@/constants/images";
import useCommandCenter from "@/hooks/useCommandCenter";
import useEventAuthContext from "@/hooks/useEventAuthContext";
import usePictureContext from "@/hooks/usePictureContext";
import { revertTransferSafeCCP } from "@/utils/pictureprocessing";

export default function EventScreen() {
  const { EventState } = useEventAuthContext();
  const { pictureState } = usePictureContext();
  const [lastPicTime, setLastPicTime] = useState("");
  const params = useLocalSearchParams();
  const [prevParamUri, setPrevParamUri] = useState("");

  const { t } = useTranslation();

  const hasLastPicture =
    pictureState.lastPicture && pictureState.lastPicture.isValid;

  const sheetRef = useRef<BottomSheet>(null);

  const doUpload = useCallback((delay: number) => {
    setTimeout(() => {
      if (sheetRef.current) sheetRef.current.expand();
    }, delay);
  }, []);

  const insets = useSafeAreaInsets();
  const ratio = PixelRatio.get();

  const openProfile = () => {
    router.push("/(root)/GuestProfileScreen");
  };

  const CC = useCommandCenter();

  if (params.from && params.from === "take-picture" && params.photo) {
    const incommingPhoto = revertTransferSafeCCP(
      JSON.parse(params.photo.toString()),
    );

    if (incommingPhoto.uri !== prevParamUri) {
      CC.perform({
        type: CCActionTypes.ADD_PIC_FROM_CAMERA,
        payload: {
          cameraPhoto: incommingPhoto,
        },
      });
      setPrevParamUri(incommingPhoto.uri);
    }
  }

  useEffect(() => {
    if (lastPicTime !== pictureState.lastPicture?.timeTaken) {
      doUpload(600);
      setLastPicTime(pictureState.lastPicture?.timeTaken || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[pictureState]]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        sheetRef.current?.close();
      };
    }, []),
  );

  return (
    <KeyboardDismisWrappable>
      <MutedBGPhoto overlayOpacity={0.6} source={images.weddingbackground}>
        <StatusBar style="light" />
        <SafeAreaView className="flex flex-1 justify-between p-8 h-screen gap-8 items-center relative">
          <SimpleIconButton
            className="p-2"
            onPress={openProfile}
            icon={{ name: "account", color: "#ddd" }}
            style={{
              position: "absolute",
              top: insets.top + 8 * ratio,
              right: insets.right + 8 * ratio,
            }}
          />

          <View className="flex items-center gap-4 pt-8">
            <Text className="text-slate-300 font-Nunito text-xl">
              {t("event-generic-welcome")}
            </Text>
            <Text className="text-white font-NunitoSemiBold text-4xl text-center">
              {EventState.EventInfo?.Name}
            </Text>
          </View>

          {/* <Text className="text-textmain font-Nunito text-xl">
        {JSON.stringify(EventState)}
      </Text> */}
          {!hasLastPicture && <EventInfoNoPicture />}
          {hasLastPicture && (
            <EventLastPictureView
              doUpload={doUpload}
              picture={pictureState.lastPicture!}
            />
          )}

          <PopupMenu hostname="event-menu" trigger={<Text>Popup test</Text>}>
            <PopupMenuItem title="test item 1" icon={{ name: "cog" }} />
            <PopupMenuItem title="test item 1" icon={{ name: "cog" }} />
            <PopupMenuItem title="test item 1" icon={{ name: "cog" }} />
          </PopupMenu>

          <EventPictureToolbar params={params} />

          {hasLastPicture && !pictureState.lastPicture?.wasUploaded && (
            <SendPhotoSheet ref={sheetRef} children={undefined} />
          )}
        </SafeAreaView>
        <PortalHost name="event-menu" />
      </MutedBGPhoto>
    </KeyboardDismisWrappable>
  );
}
