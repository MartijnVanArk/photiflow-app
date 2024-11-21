import React from "react";
import { useTranslation } from "react-i18next";
import { View, Share, useWindowDimensions } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";

import PageHeader from "@/components/header/PageHeader";
import ThemeBasicButton from "@/components/ui/themed/ThemeBasicButton";
import ThemeStatusBar from "@/components/ui/themed/ThemeStatusBar";
import ThemeText from "@/components/ui/themed/ThemeText";
import useEventAuthContext from "@/hooks/useEventAuthContext";
import { getPreferredEventSourceInfo } from "@/utils/eventinfoutils";
import { includeTrailingSlash } from "@/utils/stringutils";

const ShareEventScreen = () => {
  const { t } = useTranslation();

  const { EventState } = useEventAuthContext();

  const prefrerredInfo = getPreferredEventSourceInfo(EventState.EventInfo);

  const codeUrl =
    includeTrailingSlash(process.env.EXPO_PUBLIC_BASE_CODE_DOMAIN || "") +
    prefrerredInfo?.SourceID;

  const { width, height } = useWindowDimensions();
  const qrDim = Math.min(width, height) * 0.5;

  return (
    <SafeAreaView className="bg-light flex-1 items-center  w-full max-h-full">
      <ThemeStatusBar style="auto" backgroundColor="transparent" />

      <PageHeader
        title={t("share-event-screen-title")}
        handleInset={false}
        variant="transparent"
      />

      <View className="flex-1 flex gap-8 items-center justify-center p-8 ">
        <ThemeText>{t("share-event-screen-subtitle")}</ThemeText>
        <ThemeText className="font-NunitoSemiBold text-3xl">
          {prefrerredInfo?.Name}
        </ThemeText>
        <ThemeText className="text-center text-xl">
          {t("share-event-screen-introduction")}
        </ThemeText>
        <View className="bg-white p-8 rounded-2xl border boder-primary flex-row gap-2 items-center">
          <QRCode value={codeUrl} size={qrDim} ecl="H" />
        </View>
        <ThemeText className="text-center">
          {t("share-event-screen-alt-linkshareinfo")}
        </ThemeText>
        <ThemeBasicButton
          onPress={() => {
            Share.share({
              url: codeUrl,
              message: codeUrl,
            });
          }}
          iconLeft={{
            name: "share-variant",
          }}
          title={t("share-event-screen-button-share-link")}
        />
      </View>
    </SafeAreaView>
  );
};

export default ShareEventScreen;
