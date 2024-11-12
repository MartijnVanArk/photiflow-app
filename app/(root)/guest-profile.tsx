import BottomSheet from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { PixelRatio, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GuestActionTypes } from "@/actions/GuestActions";
import ProfileAvatarSheet from "@/components/fragments/ProfileAvatarSheet";
import KeyboardDismisWrappable from "@/components/KeyboardDismisWrappable";
import DynamicAvatar from "@/components/ui/DynamicAvatar";
import InputControl from "@/components/ui/InputControl";
import SimpleIconButton from "@/components/ui/SimpleIconButton";
import ThemeButton from "@/components/ui/ThemeButton";
import useGuestContext from "@/hooks/useGuestContext";
import useTheme from "@/hooks/useTheme";
import { GuestInfoState } from "@/reducers/GuestReducer";
import {
  avatarSaveURI,
  deleteAvatar,
  getSavedAvatarURI,
  saveAvatar,
} from "@/utils/avatar-utils";
import { revertTransferSafeCCP } from "@/utils/pictureprocessing";

const UserPlaceHolder = require("@/assets/images/user-placeholder.png");

export default function GuestProfileScreen() {
  const { guestInfo, guestInfoDispatch } = useGuestContext();

  const params = useLocalSearchParams();

  const [guestProfile, setGuestProfile] = useState<GuestInfoState>(guestInfo);

  const saveProfile = () => {
    if (!guestProfile.avatar) deleteAvatar(guestInfo.avatar);

    guestInfoDispatch({
      type: GuestActionTypes.PROFILESAVED,
      payload: {
        guestInfo: guestProfile,
      },
    });
    router.back();
  };

  const ratio = PixelRatio.get();
  const inset = useSafeAreaInsets();

  const { t } = useTranslation();

  const { getVarColor } = useTheme();

  const sheetRef = useRef<BottomSheet>(null);

  const openSourceSel = () => {
    if (sheetRef.current) sheetRef.current.expand();
  };

  const newGuestProfile = (profile: GuestInfoState) => {
    setGuestProfile(profile);
  };

  if (params.from && params.from === "take-picture" && params.photo) {
    const incommingPhoto = revertTransferSafeCCP(
      JSON.parse(params.photo.toString()),
    );

    saveAvatar(incommingPhoto.uri, guestProfile.avatar);
    setGuestProfile({ ...guestProfile, avatar: avatarSaveURI() });
  }

  return (
    <KeyboardDismisWrappable>
      <View
        className="h-screen relative flex flex-1 bg-primary"
        style={{ paddingTop: inset.top }}
      >
        <StatusBar barStyle="light-content" />

        <View className="flex gap-2 justify-between flex-1 bg-light h-full p-8 relative">
          <View
            className="absolute pt-16 p-8 bg-primary"
            style={{
              height: 48 * ratio,
              top: 0,
              left: 0,
              right: 0,
            }}
          ></View>

          <View className="relative flex items-center  gap-4">
            <DynamicAvatar
              size={64}
              className="rounded-full border-8 border-primary"
              styleExtra={{
                zIndex: 2,
                borderWidth: 3 * ratio,
                borderColor: getVarColor("--color-primary-default"),
              }}
              imageUri={guestProfile.avatar}
              name={guestProfile.name}
              fallback={UserPlaceHolder}
            />
            <ThemeButton
              className="absolute z-10 border-4 border-light bottom-[-24]"
              title={t("profile-avatar-change")}
              onPress={openSourceSel}
            />
          </View>
          <View className=" flex-1 flex gap-4 justify-center">
            <InputControl
              inputMode="text"
              autoComplete="name"
              onChangeText={(val) => {
                setGuestProfile({ ...guestProfile, name: val });
              }}
              value={guestProfile.name}
              placeholder={t("profile-name-placeholder")}
              icon={{ name: "account" }}
            />
            <InputControl
              autoComplete="email"
              inputMode="email"
              keyboardType="email-address"
              value={guestProfile.email}
              onChangeText={(val) => {
                setGuestProfile({ ...guestProfile, email: val });
              }}
              placeholder={t("profile-email-placeholder")}
              icon={{ name: "email-outline" }}
            />
          </View>

          <ThemeButton
            title={t("profile-button-save-title")}
            className="py-4"
            onPress={saveProfile}
          />
          <ThemeButton
            title="AV INFO"
            className="py-4"
            onPress={() => getSavedAvatarURI(guestProfile.avatar)}
          />
          <ThemeButton
            title="del"
            className="py-4"
            onPress={() => deleteAvatar(guestProfile.avatar)}
          />
        </View>

        <SimpleIconButton
          onPress={() => router.back()}
          style={{ top: inset.top + 8 * ratio, left: 8 * ratio }}
          className="absolute"
          icon={{ name: "close", color: "white" }}
        />
        <ProfileAvatarSheet
          ref={sheetRef}
          children={undefined}
          guestProfile={guestProfile}
          newGuestProfile={newGuestProfile}
        />
      </View>
    </KeyboardDismisWrappable>
  );
}
