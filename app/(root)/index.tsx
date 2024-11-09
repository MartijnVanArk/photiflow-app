import BottomSheet from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useCallback, useRef } from "react";
import { Alert, ImageBackground, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { CCActionTypes } from "@/actions/CommandCenterActions";
import SendPhotoSheet from "@/components/SendPhotoSheet";
import ThemeButton from "@/components/ui/ThemeButton";
import useCommandCenter from "@/hooks/useCommandCenter";
import usePartyAuthContext from "@/hooks/usePartyAuthContext";
import usePictureContext from "@/hooks/usePictureContext";

export default function IndexScreen() {
  const { partyState } = usePartyAuthContext();
  const { pictureState } = usePictureContext();

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

  const doUpload = useCallback(() => {
    if (sheetRef.current) sheetRef.current.expand();
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="flex flex-1 justify-between p-8 h-screen gap-8 items-center bg-light">
        <View className="flex items-center gap-4">
          <Text className="text-textsecondary font-Nunito text-xl">
            Welcome
          </Text>
          <Text className="text-textmain font-Nunito text-3xl">
            {partyState.partyInfo?.Name}
          </Text>
        </View>

        {/* <Text className="text-textmain font-Nunito text-xl">
        {JSON.stringify(partyState)}
      </Text> */}
        {!hasLastPicture && (
          <View>
            <Text className="text-3xl font-Nunito text-textmain">
              Welcome & uitleg
            </Text>
          </View>
        )}
        {hasLastPicture && (
          <ImageBackground
            className="border-primary border-8 w-full rounded-3xl flex-1 p-4 flex justify-end items-center"
            imageStyle={{ borderRadius: 14 }}
            source={{ uri: pictureState.lastPicture?.uri }}
          >
            {!pictureState.lastPicture?.wasUploaded && (
              <ThemeButton
                onPress={doUpload}
                title="Upload"
                iconLeft={{ name: "cloud-upload-outline" }}
              ></ThemeButton>
            )}
            {pictureState.lastPicture?.wasUploaded && (
              <View>
                <Text>Lsat Picture Info was uploaded</Text>
              </View>
            )}
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
            onPress={() => router.push("/(root)/takepicture")}
            title=""
            iconLeft={{ name: "camera", size: 36 }}
            className="rounded-full p-8"
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
    </GestureHandlerRootView>
  );
}
