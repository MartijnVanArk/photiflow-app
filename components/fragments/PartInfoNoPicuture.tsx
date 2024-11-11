import { Image, Text, View } from "react-native";

const WelComDef = require("@/assets/images/welcome-default.png");

const PartyInfoNoPicture = () => {
  return (
    <View className="flex-1 w-full items-center justify-center">
      <Text className="text-3xl font-Nunito text-white">
        Een dag uit duizenden
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
        Wat leuk dat je onze dag mee viert! Om het nog specialer te maken vragen
        we je alle top momenten vast te leggen en toe te voegen.
      </Text>
      <View></View>
    </View>
  );
};

export default PartyInfoNoPicture;
