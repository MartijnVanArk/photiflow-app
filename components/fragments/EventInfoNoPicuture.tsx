import { Image } from "expo-image";
import { useWindowDimensions, View } from "react-native";

import useEventAuthContext from "@/hooks/useEventAuthContext";
import {
  getPreferredEventSourceInfo,
  makeEventImageUri,
} from "@/utils/eventinfoutils";

import ThemeText from "../ui/themed/ThemeText";

const EventInfoNoPicture = () => {
  const { EventState } = useEventAuthContext();

  const { width, height } = useWindowDimensions();

  const preferredInfo = getPreferredEventSourceInfo(EventState.EventInfo);

  const target = Math.min(width, height) * 0.6;
  const introImage = makeEventImageUri(
    EventState.EventInfo?.MetaData?.CdnUrl || "",
    preferredInfo?.IntroImage,
    target,
  );

  return (
    <View className="flex-1 w-full items-center justify-center">
      <ThemeText className="text-3xl text-center text-white">
        [notfound]
      </ThemeText>
      <Image
        placeholder={introImage.blurhash}
        style={{
          aspectRatio: "1/1",
          width: target,
          height: target,
          margin: 20,
          borderRadius: 5000,
        }}
        source={{ uri: introImage.uri, width: target, height: target }}
        contentFit="cover"
      />
      <ThemeText className="font-NunitoLight text-center text-white text-xl">
        {preferredInfo?.WelcomeMessage}
      </ThemeText>
    </View>
  );
};

export default EventInfoNoPicture;
