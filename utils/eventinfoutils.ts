import { BaseImage, GetInfoCommandOutput } from "@partystream/client-app";

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
  image: BaseImage | undefined,
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
  WelcomeTitle: string;
  IntroImage: BaseImage;
  BackgroundImage: BaseImage;
  SourceID: string;
}
export const getPreferredEventSourceInfo = (
  info: GetInfoCommandOutput | null,
): PreferredEventSourceInfo | null => {
  if (!info) return null;

  const res: PreferredEventSourceInfo = {
    Name: info.Event.Name,
    WelcomeMessage: info.Event.WelcomeMessage,
    WelcomeTitle: info.Event.WelcomeTitle,
    IntroImage: info.Event.IntroImage,
    BackgroundImage: info.Event.BackgroundImage,
    SourceID: info.Event.EventId,
  };

  if (info.Source.BackgroundImage)
    res.BackgroundImage = info.Source.BackgroundImage;

  if (info.Source.IntroImage) res.IntroImage = info.Source.IntroImage;

  if (info.Source.WelcomeMessage)
    res.WelcomeMessage = info.Source.WelcomeMessage;

  if (info.Source.WelcomeTitle) res.WelcomeTitle = info.Source.WelcomeTitle;

  if (info.Source.SourceId) res.SourceID = info.Source.SourceId;

  return res;
};

export const getTagKeyValueForPrefix = (
  tags: Record<string, string>,
  prefix: string,
): Record<string, string> => {
  const res: Record<string, string> = {};

  for (const key in tags) {
    const value = tags[key];
    const tagInfo = key.split(":");

    if (tagInfo.length >= 2) {
      const pre = tagInfo.shift();
      if (pre === prefix) {
        res[tagInfo.join(":")] = value;
      }
    }
  }

  return res;
};

export const getValidTagsForPrefix = (
  tags: Record<string, string>,
  prefix: string,
): string[] => {
  const res: string[] = [];

  for (const key in tags) {
    const value = tags[key];
    const tagInfo = key.split(":");

    if (tagInfo.length >= 2) {
      const pre = tagInfo.shift();
      if (pre === prefix && value === "true") {
        res.push(tagInfo.join(":"));
      }
    }
  }

  return res;
};

export const getGuestTagsFromCombined = (
  tags: Record<string, string>,
): string[] => {
  const res: string[] = [];

  for (const key in tags) {
    const state = tags[key];
    const tagInfo = key.split(":");

    if (state === "true" && tagInfo.length >= 2 && tagInfo[0] === "custom") {
      res.push(tagInfo[1]);
    }
  }

  return res;
};
