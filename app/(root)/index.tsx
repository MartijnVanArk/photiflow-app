import BottomSheet from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  PixelRatio,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { CCActionTypes } from "@/actions/CommandCenterActions";
import PartyInfoNoPicture from "@/components/fragments/PartInfoNoPicuture";
import SendPhotoSheet from "@/components/fragments/SendPhotoSheet";
import KeyboardDismisWrappable from "@/components/KeyboardDismisWrappable";
import MutedBGPhoto from "@/components/ui/MutedBGPhoto";
import SimpleIconButton from "@/components/ui/SimpleIconButton";
import ThemeButton from "@/components/ui/ThemeButton";
import useCommandCenter from "@/hooks/useCommandCenter";
import usePartyAuthContext from "@/hooks/usePartyAuthContext";
import usePictureContext from "@/hooks/usePictureContext";
import { encodeSafePicUri } from "@/lib/pictureprocessing";
import { formatDate } from "@/utils/datestuff";
import { formatTagMap } from "@/utils/tagutils";

const WeddingBackground = require("@/assets/images/wedding.png");

export default function PartyScreen() {
  const { partyState } = usePartyAuthContext();
  const { pictureState } = usePictureContext();
  //  const { guestInfo } = useGuestContext();
  const [lastPicTime, setLastPicTime] = useState("");

  const CC = useCommandCenter();

  const leave = () => {
    Alert.alert(
      "Leave Party?",
      "Are you sure you want to miss out on the fun?",
      [
        {
          text: "Yes",
          onPress: () => {
            CC.perform({
              type: CCActionTypes.LEAVE_PARTY,
            });
            router.replace("/(start)/welcome");
          },
        },
        { text: "No", style: "cancel" },
      ],
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: false,
      exif: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      legacy: true,
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      CC.perform({
        type: CCActionTypes.ADD_PIC_FROM_GALLERY,
        payload: {
          galleryPhoto: result,
        },
      });
    }
  };

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
    router.push("/(root)/guest-profile");
  };

  useEffect(() => {
    if (lastPicTime !== pictureState.lastPicture?.timeTaken) {
      doUpload(600);
      setLastPicTime(pictureState.lastPicture?.timeTaken || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[pictureState]]);

  const goTakePicture = () => {
    router.push("/(root)/takepicture");
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        sheetRef.current?.close();
      };
    }, []),
  );

  const imgClick = useCallback(() => {
    router.navigate({
      pathname: "/(root)/singlepictureviewer",
      params: {
        picture: encodeSafePicUri(pictureState.lastPicture?.uri || ""),
        width: pictureState.lastPicture?.width,
        height: pictureState.lastPicture?.height,
      },
    });
  }, [pictureState.lastPicture]);

  console.log(pictureState.lastPicture);

  return (
    <KeyboardDismisWrappable>
      <MutedBGPhoto overlayOpacity={0.6} source={WeddingBackground}>
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
            <Text className="text-slate-300 font-Nunito text-xl">Welcome</Text>
            <Text className="text-white font-NunitoSemiBold text-4xl text-center">
              {partyState.partyInfo?.Name}
            </Text>
          </View>

          {/* <Text className="text-textmain font-Nunito text-xl">
        {JSON.stringify(partyState)}
      </Text> */}
          {!hasLastPicture && <PartyInfoNoPicture />}
          {hasLastPicture && (
            <ImageBackground
              className="border-primary border-1 w-full rounded-3xl flex-1 flex justify-end overflow-hidden elevation-md"
              imageStyle={{ borderRadius: 14 }}
              source={{ uri: pictureState.lastPicture?.uri }}
            >
              <TouchableOpacity
                activeOpacity={1}
                className="flex flex-1 justify-end"
                onPress={imgClick}
              >
                <LinearGradient
                  colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]}
                  className="p-4 flex items-center justify-center"
                >
                  {!pictureState.lastPicture?.wasUploaded && (
                    <ThemeButton
                      onPress={() => {
                        doUpload(10);
                      }}
                      title="Upload"
                      iconLeft={{ name: "cloud-upload-outline" }}
                    ></ThemeButton>
                  )}
                  {pictureState.lastPicture?.wasUploaded && (
                    <View className="flex gap-4 flex-row w-full bg-overlaydark py-2 px-4 rounded-md">
                      {pictureState.lastPicture.guest.avatar && (
                        <Image
                          className="w-10 mt-1 h-10 rounded-full"
                          source={{
                            uri: pictureState.lastPicture.guest.avatar,
                          }}
                        />
                      )}
                      <View className="flex-1 flex ">
                        {pictureState.lastPicture.guest.name && (
                          <Text className="font-Nunito text-white">
                            {pictureState.lastPicture.guest.name}
                          </Text>
                        )}
                        <Text className="font-Nunito text-slate-400">
                          {formatDate(pictureState.lastPicture.timeTaken)}
                        </Text>
                        {pictureState.lastPicture.comment && (
                          <Text className="font-Nunito text-white">
                            {pictureState.lastPicture.comment}
                          </Text>
                        )}
                        {pictureState.lastPicture.tags.size > 0 && (
                          <Text className="font-Nunito text-white">
                            {formatTagMap(pictureState.lastPicture.tags)}
                          </Text>
                        )}
                      </View>
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </ImageBackground>
          )}
          <View className="flex w-full items-center justify-between flex-row gap-4">
            <ThemeButton
              onPress={pickImage}
              title=""
              variant="secondary"
              iconLeft={{ name: "view-gallery-outline" }}
            />
            <ThemeButton
              onPress={goTakePicture}
              title=""
              iconLeft={{ name: "camera", size: 36 }}
              className="p-8"
              rounded="rounded-full"
            />
            <ThemeButton
              onPress={leave}
              variant="secondary"
              title=""
              iconLeft={{ name: "exit-to-app" }}
            />
          </View>

          {hasLastPicture && !pictureState.lastPicture?.wasUploaded && (
            <SendPhotoSheet ref={sheetRef} children={undefined} />
          )}
        </SafeAreaView>
      </MutedBGPhoto>
    </KeyboardDismisWrappable>
  );
}
