import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { BottomSheetViewProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";

import useTheme from "@/hooks/useTheme";
import { GuestInfoState } from "@/reducers/GuestReducer";
import { avatarSaveURI, saveAvatar } from "@/utils/avatar-utils";

import SimpleIconButton from "../ui/SimpleIconButton";

export interface ProfileAvatarSheetProps extends BottomSheetViewProps {
  newGuestProfile: (profile: GuestInfoState) => void;
  guestProfile: GuestInfoState;
}

const ProfileAvatarSheet = forwardRef<BottomSheet, ProfileAvatarSheetProps>(
  ({ newGuestProfile, guestProfile, children, ...props }, ref) => {
    const sheetRef = useRef<BottomSheet>(null);

    useImperativeHandle(ref, () => sheetRef.current as BottomSheet);

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

    const gotNewAvatarUri = useCallback(
      (aURI: string) => {
        saveAvatar(aURI, guestProfile.avatar);
        newGuestProfile({ ...guestProfile, avatar: avatarSaveURI() });
      },
      [guestProfile, newGuestProfile],
    );

    const picCamera = useCallback(() => {
      sheetRef.current?.close();

      router.navigate({
        pathname: "/(root)/TakePictureScreen",
        params: {
          returnpath: "/(root)/GuestProfileScreen",
          camfacing: "front",
        },
      });
    }, []);

    const picGallery = useCallback(async () => {
      sheetRef.current?.close();

      let result = await ImagePicker.launchImageLibraryAsync({
        base64: false,
        exif: true,
        mediaTypes: ["images"],
        legacy: true,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        gotNewAvatarUri(result.assets[0].uri);
      }
    }, [gotNewAvatarUri]);

    const clearAvatar = useCallback(() => {
      sheetRef.current?.close();
      newGuestProfile({ ...guestProfile, avatar: "" });
    }, [guestProfile, newGuestProfile]);

    const { getVarColor } = useTheme();
    const { t } = useTranslation();

    return (
      <BottomSheet
        index={-1}
        backdropComponent={renderBackdrop}
        ref={sheetRef}
        enablePanDownToClose={true}
        handleStyle={{
          backgroundColor: getVarColor("--color-light-sec-default"),
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
        handleIndicatorStyle={{
          backgroundColor: getVarColor("--color-text-secondary"),
        }}
      >
        <BottomSheetView className="h-full p-8 flex flex-row gap-8 justify-start bg-lightsec">
          <SimpleIconButton
            onPress={picCamera}
            icon={{
              name: "camera",
              color: getVarColor("--color-text-main"),
            }}
            title={t("profile-source-camera")}
          />
          <SimpleIconButton
            onPress={picGallery}
            icon={{
              name: "image",
              color: getVarColor("--color-text-main"),
            }}
            title={t("profile-source-gallery")}
          />
          <SimpleIconButton
            onPress={clearAvatar}
            icon={{
              name: "close-thick",
              color: getVarColor("--color-text-main"),
            }}
            title={t("profile-source-clear")}
          />
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

ProfileAvatarSheet.displayName = "ProfileAvatarSheet";

export default ProfileAvatarSheet;
