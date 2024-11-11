import { router } from "expo-router";
import { useState } from "react";
import { Image, PixelRatio, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GuestActionTypes } from "@/actions/GuestActions";
import KeyboardDismisWrappable from "@/components/KeyboardDismisWrappable";
import InputControl from "@/components/ui/InputControl";
import ThemeButton from "@/components/ui/ThemeButton";
import useGuestContext from "@/hooks/useGuestContext";
import { GuestInfoState } from "@/reducers/GuestReducer";

//const UserPlaceHolder = require("@/assets/images/user-placeholder.png");

export default function GuestProfileScreen() {
  const { guestInfo, guestInfoDispatch } = useGuestContext();

  const [guestProfile, setGuestProfile] = useState<GuestInfoState>(guestInfo);

  const saveProfile = () => {
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

  return (
    <KeyboardDismisWrappable>
      <View
        className="h-screen relative flex flex-1 bg-primary"
        style={{ paddingTop: inset.top }}
      >
        <StatusBar barStyle="light-content" />
        <View className="flex justify-between flex-1 bg-light h-full p-8 relative">
          <View
            className="absolute pt-16 p-8 bg-primary"
            style={{
              height: 48 * ratio,
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1,
              elevation: 1,
            }}
          ></View>

          <View className="relative flex items-center  gap-4">
            <Image
              className="rounded-full border-8 border-primary"
              style={{
                width: 64 * ratio,
                height: 64 * ratio,
                zIndex: 2,
              }}
              source={{
                uri: guestInfo.avatar,
              }}
            ></Image>
            <ThemeButton
              className="absolute z-10 border-4 border-light bottom-[-24]"
              title="change"
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
              placeholder="Your Name"
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
              placeholder="Your Email"
              icon={{ name: "email-outline" }}
            />
          </View>

          <ThemeButton title="Save" className="py-4" onPress={saveProfile} />
        </View>
      </View>
    </KeyboardDismisWrappable>
  );
}
