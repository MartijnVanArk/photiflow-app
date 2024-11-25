import BottomSheet from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { PixelRatio, ScrollView, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GuestActionTypes } from "@/actions/GuestActions";
import ProfileAvatarSheet from "@/components/fragments/ProfileAvatarSheet";
import KeyboardDismisWrappable from "@/components/KeyboardDismisWrappable";
import CloseBackButton from "@/components/ui/CloseBackButton";
import DateInputControl from "@/components/ui/DateInputControl";
import DynamicAvatar from "@/components/ui/DynamicAvatar";
import InputControl from "@/components/ui/input/InputControl";
import TagInput from "@/components/ui/input/TagInput";
import ThemeBasicButton from "@/components/ui/themed/ThemeBasicButton";
import ThemeStatusBar from "@/components/ui/themed/ThemeStatusBar";
import { images } from "@/constants/images";
import useGuestContext from "@/hooks/useGuestContext";
import { GuestInfoState } from "@/reducers/GuestReducer";
import { avatarSaveURI, deleteAvatar, saveAvatar } from "@/utils/avatar-utils";
import { revertTransferSafeCCP } from "@/utils/pictureprocessing";

export default function GuestProfileScreen() {
  const { guestInfo, guestInfoDispatch } = useGuestContext();

  const params = useLocalSearchParams();

  const [guestProfile, setGuestProfile] = useState<GuestInfoState>(guestInfo);

  const saveProfile = useCallback(() => {
    if (!guestProfile.avatar) deleteAvatar(guestInfo.avatar);

    guestInfoDispatch({
      type: GuestActionTypes.PROFILESAVED,
      payload: {
        guestInfo: guestProfile,
      },
    });
    router.back();
  }, [guestInfo.avatar, guestInfoDispatch, guestProfile]);

  const ratio = PixelRatio.get();
  const inset = useSafeAreaInsets();

  const { t } = useTranslation();

  const sheetRef = useRef<BottomSheet>(null);

  const openSourceSel = useCallback(() => {
    if (sheetRef.current) sheetRef.current.expand();
  }, [sheetRef]);

  const newGuestProfile = useCallback(
    (profile: GuestInfoState) => {
      setGuestProfile(profile);
    },
    [setGuestProfile],
  );

  useEffect(() => {
    if (params.from && params.from === "take-picture" && params.photo) {
      const incommingPhoto = revertTransferSafeCCP(
        JSON.parse(params.photo.toString()),
      );

      saveAvatar(incommingPhoto.uri, guestProfile.avatar);
      setGuestProfile({ ...guestProfile, avatar: avatarSaveURI() });
    }
  }, [guestProfile, params.from, params.photo]);

  return (
    <KeyboardDismisWrappable>
      <View
        className="h-screen relative flex flex-1 bg-primary"
        style={{ paddingTop: inset.top }}
      >
        <ThemeStatusBar />

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
            <Pressable onPress={openSourceSel}>
              <DynamicAvatar
                size={64}
                className="rounded-full border-8 border-light"
                imageUri={guestProfile.avatar}
                name={guestProfile.name}
                fallback={images.userplaceholdercam}
              />
            </Pressable>
            {/* <ThemeBasicButton
              className="absolute z-10 border-4 border-light bottom-[32]"
              title={t("profile-avatar-change")}
              onPress={openSourceSel}
            /> */}
          </View>
          <ScrollView className="flex-1 flex ">
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

            <DateInputControl
              wrapperClassName="mt-2"
              date={new Date(guestProfile.birthDate)}
              placeholder={t("profile-birthday-placeholder")}
              onDateChange={(date) => {
                setGuestProfile({
                  ...guestProfile,
                  birthDate: date.toISOString(),
                });
              }}
            />

            <TagInput
              className="mt-2"
              tags={guestProfile.defTags}
              onNewTags={(tags) => {
                setGuestProfile({ ...guestProfile, defTags: tags });
              }}
              placeholder={t("profile-tags-placeholder")}
            />
          </ScrollView>
          <ThemeBasicButton
            title={t("profile-button-save-title")}
            className="py-4"
            onPress={saveProfile}
          />
          {/* <ThemeBasicButton
            title="AV INFO"
            className="py-4"
            onPress={() => getSavedAvatarURI(guestProfile.avatar)}
          />
          <ThemeBasicButton
            title="del"
            className="py-4"
            onPress={() => deleteAvatar(guestProfile.avatar)}
          /> */}
        </View>

        <CloseBackButton backGround="transparent" />

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
