import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { PortalHost } from "@gorhom/portal";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { PixelRatio, useWindowDimensions, View } from "react-native";
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
import ThemeBasicButton from "@/components/ui/themed/ThemeBasicButton";
import ThemeStatusBar from "@/components/ui/themed/ThemeStatusBar";
import ThemeText from "@/components/ui/themed/ThemeText";
import useCommandCenter from "@/hooks/useCommandCenter";
import useEventAuthContext from "@/hooks/useEventAuthContext";
import useImageViewer from "@/hooks/useImageViewer";
import { useNavigationHelper } from "@/hooks/useNavigationHelper";
import usePictureContext from "@/hooks/usePictureContext";
import {
  getPreferredEventSourceInfo,
  makeEventImageUri,
} from "@/utils/eventinfoutils";
import { revertTransferSafeCCP } from "@/utils/pictureprocessing";

export default function EventScreen() {
  const { EventState } = useEventAuthContext();
  const { pictureState } = usePictureContext();
  const [lastPicTime, setLastPicTime] = useState("");
  const params = useLocalSearchParams();
  const [prevParamUri, setPrevParamUri] = useState("");

  const { t } = useTranslation();

  const hasLastPicture = useMemo(() => {
    return pictureState.lastPicture && pictureState.lastPicture.isValid;
  }, [pictureState]);

  const sheetRef = useRef<BottomSheet>(null);

  const doUpload = useCallback((delay: number) => {
    setTimeout(() => {
      if (sheetRef.current) sheetRef.current.expand();
    }, delay);
  }, []);

  const insets = useSafeAreaInsets();
  const ratio = PixelRatio.get();

  const openProfile = useCallback(() => {
    router.push("/(root)/GuestProfileScreen");
  }, []);

  const openMyPictures = useCallback(() => {
    router.push("/(root)/MyPicturesScreen");
  }, []);

  const CC = useCommandCenter();

  useEffect(() => {
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
  }, [params, CC, prevParamUri]);

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

  const { showImageViewer, ImageModal } = useImageViewer();

  const navigationHelper = useNavigationHelper();

  const enterPin = useCallback(() => {
    navigationHelper.pushWithCallback({
      pathname: "/(management)/EnterPinScreen",
      params: {
        returnpath: "/(root)/EventScreen",
        title: t("event-enter-management-pin-title"),
        message: t("event-enter-management-pin-message"),
      },
      callback: async (pin: string): Promise<boolean> => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(pin === "123456");
          }, 1000);
        });
      },
    });
  }, [navigationHelper, t]);

  useFocusEffect(
    useCallback(() => {
      if (
        params.from &&
        params.from === "enter-pin" &&
        params.pin &&
        params.pinValid
      ) {
        router.setParams({ pin: "", pinValid: 0, from: "" });

        setTimeout(() => {
          router.push("/(management)/(Tabs)/EventSettingsScreen");
        }, 10);
      }
    }, [params]),
  );

  const preferredInfo = getPreferredEventSourceInfo(EventState.EventInfo);

  const { width, height } = useWindowDimensions();

  const backGroundImage = makeEventImageUri(
    EventState.EventInfo?.MetaData?.CdnUrl || "",
    preferredInfo?.BackgroundImage,
    Math.max(width, height),
  );

  return (
    <KeyboardDismisWrappable>
      <MutedBGPhoto
        className="flex flex-1 w-full h-full bg-red-600"
        placeholder={backGroundImage.blurhash}
        overlayOpacity={0.75}
        source={{
          uri: backGroundImage.uri,
          width: backGroundImage.width,
          height: backGroundImage.height,
        }}
      >
        <ThemeStatusBar hidden={false} backgroundColor="transparent" />
        <SafeAreaView className="flex flex-1 justify-between p-8 h-screen gap-8 items-center relative">
          <View
            style={{
              position: "absolute",
              top: insets.top + 8 * ratio,
              right: insets.right + 8 * ratio,
            }}
          >
            <PopupMenu
              hostname="event-menu"
              trigger={
                <MaterialCommunityIcons
                  name="dots-vertical"
                  color={"#fff"}
                  className="p-2"
                  size={24}
                />
              }
            >
              <PopupMenuItem
                titlei18n="event-menu-profile"
                icon={{ name: "account" }}
                onPress={openProfile}
              />
              <PopupMenuItem
                titlei18n="event-menu-mypictures"
                icon={{ name: "image-multiple-outline" }}
                onPress={openMyPictures}
              />
              <PopupMenuItem
                titlei18n="event-menu-management"
                icon={{ name: "cog" }}
                onPress={enterPin}
              />
            </PopupMenu>
          </View>

          <View className="flex flex-row gap-4">
            <ThemeBasicButton
              title="manage"
              onPress={() =>
                router.push("/(management)/(Tabs)/EventSettingsScreen")
              }
            />
            <ThemeBasicButton
              title="test"
              onPress={() => router.push("/(root)/TestScreen")}
            />
          </View>

          <View className="flex items-center gap-4 pt-8">
            <ThemeText className="text-slate-300 text-xl">
              {t("event-generic-welcome")}
            </ThemeText>
            <ThemeText className="text-white font-NunitoSemiBold text-4xl text-center">
              {preferredInfo?.Name}
            </ThemeText>
          </View>

          {!hasLastPicture && <EventInfoNoPicture />}
          {hasLastPicture && (
            <EventLastPictureView
              isUploading={pictureState.isUploading}
              onPictureClick={(uri: string) => {
                showImageViewer(uri);
              }}
              doUpload={doUpload}
              picture={pictureState.lastPicture!}
            />
          )}

          <EventPictureToolbar params={params} />

          {hasLastPicture && !pictureState.lastPicture?.wasUploaded && (
            <SendPhotoSheet ref={sheetRef} children={undefined} />
          )}
        </SafeAreaView>
        <PortalHost name="event-menu" />
      </MutedBGPhoto>
      <ImageModal />
    </KeyboardDismisWrappable>
  );
}
