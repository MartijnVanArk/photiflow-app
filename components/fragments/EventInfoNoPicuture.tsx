import { Image } from "expo-image";
import { Text, View } from "react-native";

import { images } from "@/constants/images";
import useEventAuthContext from "@/hooks/useEventAuthContext";

import ThemeText from "../ui/ThemeText";

const EventInfoNoPicture = () => {
  const { EventState } = useEventAuthContext();

  return (
    <View className="flex-1 w-full items-center justify-center">
      <ThemeText className="text-3xl text-center text-white">
        {EventState.EventInfo?.WelcomeTitle}
      </ThemeText>
      <Image
        style={{
          aspectRatio: "1/1",
          width: "60%",
          height: undefined,
          margin: 20,
          borderRadius: 5000,
        }}
        source={images.welcomedefault}
        contentFit="cover"
      />
      <ThemeText className="font-NunitoLight text-center text-white text-xl">
        {EventState.EventInfo?.WelcomeMessage}
      </ThemeText>
    </View>
  );
};

export default EventInfoNoPicture;
