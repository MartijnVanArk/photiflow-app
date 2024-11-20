import { EventImage, GetInfoCommandOutput } from "@partystream/client-app";

import { includeTrailingSlash } from "./stringutils";

export interface EventImageUri {
  uri: string;
  width: number;
  height: number;
  blurhash: string;
}

export const EmptyEventImageUri: EventImageUri = {
  uri: "",
  width: 0,
  height: 0,
  blurhash: "",
};

export const makeEventImageUri = (
  cdn: string,
  image: EventImage | undefined,
  targetSize: number,
): EventImageUri => {
  if (!image) return EmptyEventImageUri;

  const res: EventImageUri = {
    uri:
      includeTrailingSlash(cdn) + image.ImageKey + "?targetSize=" + targetSize,
    width: image.Width,
    height: image.Height,
    blurhash: "blurhash:/" + image.Preview,
  };

  return res;
};

export interface PreferredEventSourceInfo {
  Name: string;
  WelcomeMessage: string;
  IntroImage: EventImage | undefined;
  BackgroundImage: EventImage | undefined;
}
export const getPreferredEventSourceInfo = (
  info: GetInfoCommandOutput | null,
): PreferredEventSourceInfo | null => {
  if (!info) return null;

  const res: PreferredEventSourceInfo = {
    Name: info.Event.Name,
    WelcomeMessage: info.Event.WelcomeMessage,
    IntroImage: info.Event.IntroImage,
    BackgroundImage: info.Event.BackgroundImage,
  };

  if (info.Source.BackgroundImage)
    res.BackgroundImage = info.Source.BackgroundImage;

  if (info.Source.IntroImage) res.IntroImage = info.Source.IntroImage;

  if (info.Source.Name) res.Name = info.Source.Name;

  if (info.Source.WelcomeMessage)
    res.WelcomeMessage = info.Source.WelcomeMessage;

  return res;
};
