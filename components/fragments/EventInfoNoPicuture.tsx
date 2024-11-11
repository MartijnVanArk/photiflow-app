import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";

import useEventAuthContext from "@/hooks/useEventAuthContext";

const WelComDef = require("@/assets/images/welcome-default.png");

const EventInfoNoPicture = () => {
  const { EventState } = useEventAuthContext();
  const { t } = useTranslation();

  return (
    <View className="flex-1 w-full items-center justify-center">
      <Text className="text-3xl font-Nunito text-center text-white">
        {EventState.EventInfo?.WelcomeTitle}
      </Text>
      <Image
        style={{
          aspectRatio: "1/1",
          width: "60%",
          height: undefined,
          margin: 20,
        }}
        source={WelComDef}
        resizeMode="cover"
        className="rounded-full"
      />
      <Text className="font-NunitoLight text-center text-white text-xl">
        {EventState.EventInfo?.WelcomeMessage}
      </Text>
      <View></View>
    </View>
  );
};

export default EventInfoNoPicture;
