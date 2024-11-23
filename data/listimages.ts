import { BaseImage } from "@partystream/client-app";

export interface ImageEntry {
  CreationDate: string;
  DateTime: string;
  Height: number;
  ImageKey: string;
  Message: string;
  Preview: string;
  Tags: Record<string, string>;
  UserAvatar: BaseImage | null;
  UserName: string;
  Width: number;
}
export interface TestImageListType {
  MetaData: {
    CdnUrl: string;
  };
  Items: ImageEntry[];
}

export const ListImagesTestData: TestImageListType = {
  MetaData: {
    CdnUrl: "https://d1q5xw87zbwn28.cloudfront.net/",
  },
  Items: [
    {
      CreationDate: "0001-01-01T00:00:00Z",
      ImageKey: "event-img/evt-OK77YZPYw2mqZFB/img-/T9vAPY3ialS2kaXFlFqveNK884",
      Width: 3024,
      Height: 4032,
      Preview: "THGt=@~B8_.6bGRP9[Szja-pxaax",
      DateTime: "2021-12-03T10:12:49Z",
      UserName: "",
      Message: "Dit is een iOS test",
      UserAvatar: null,
      Tags: {
        "custom:ios": "true",
        "custom:test": "true",
        "device:manufacturer": "Apple",
        "device:model": "iPhone 11",
        "location:lat": "52.34519166666667",
        "location:long": "5.621672222222223",
      },
    },
    {
      CreationDate: "0001-01-01T00:00:00Z",
      ImageKey: "event-img/evt-OK77YZPYw2mqZFB/img-9NhW/ikK37epEL7OJCXUzxcQGtg",
      Width: 2160,
      Height: 3840,
      Preview: "TZGjyyxur=0#RkSiJUoeWV%0WVae",
      DateTime: "2024-10-18T17:52:17Z",
      UserName: "",
      Message: "En een Android yest",
      UserAvatar: null,
      Tags: {
        "content:alcohol:product": "true",
        "custom:android": "true",
        "custom:test": "true",
        "device:manufacturer": "Google",
        "device:model": "Pixel 7 Pro",
      },
    },
    {
      CreationDate: "0001-01-01T00:00:00Z",
      ImageKey: "event-img/evt-OK77YZPYw2mqZFB/img-ZB0PSqRU+Ph0v933BWSLxWcjmCo",
      Width: 1440,
      Height: 1920,
      Preview: "TwIGSI.6%L~oVyV_.6RjRjozWAax",
      DateTime: "2024-11-10T19:52:12Z",
      UserName: "",
      Message: "Hier wat test teskst als commentaar",
      UserAvatar: null,
      Tags: {
        "custom:bier": "true",
        "custom:gezellig": "true",
        "custom:hoofdpij": "true",
        "device:manufacturer": "Google",
        "device:model": "sdk_gphone64_x86_64",
      },
    },
    {
      CreationDate: "0001-01-01T00:00:00Z",
      ImageKey: "event-img/evt-OK77YZPYw2mqZFB/img-i9hFfW+pOB8gmBS6a8TbWLPGAPE",
      Width: 960,
      Height: 1280,
      Preview: "TREx^V~p-;-:%LxuIUIVRjslWAM|",
      DateTime: "2024-11-10T19:53:03Z",
      UserName: "",
      Message: "",
      UserAvatar: null,
      Tags: {
        "device:manufacturer": "Google",
        "device:model": "sdk_gphone64_x86_64",
      },
    },
    {
      CreationDate: "0001-01-01T00:00:00Z",
      ImageKey: "event-img/evt-OK77YZPYw2mqZFB/img-hqhOFUAp7xlC8AplUaqzOoa/u0c",
      Width: 410,
      Height: 943,
      Preview: "TDAK2Kog4mRPfQxu4oWB?a_3t7IU",
      DateTime: "2024-11-20T14:17:30Z",
      UserName: "",
      Message: "#feeling-good Nice event!",
      UserAvatar: null,
      Tags: {
        "content:non-explicit:kissing": "true",
        "custom:test1": "122345",
        "custom:test2": "1234567890",
        "custom:test3": "1234:%567890",
        "hashtag:feeling-good": "true",
      },
    },
    {
      CreationDate: "0001-01-01T00:00:00Z",
      ImageKey: "event-img/evt-OK77YZPYw2mqZFB/img-YWXRzwUKmThCuhZ9gCHfM3ZE2m8",
      Width: 750,
      Height: 561,
      Preview: "LIHxEF-=9Z~W~9WBPBx]%f%LxvIU",
      DateTime: "2024-11-20T19:39:24Z",
      UserName: "Joost",
      Message: "#feeling-good Nice event!",
      UserAvatar: null,
      Tags: {
        "content:non-explicit:kissing": "true",
        "custom:test1": "122345",
        "custom:test2": "1234567890",
        "custom:test3": "1234:%567890",
        "hashtag:feeling-good": "true",
      },
    },
    {
      CreationDate: "2024-11-21T12:32:54Z",
      ImageKey: "event-img/evt-OK77YZPYw2mqZFB/img-N2E9AsH14eEMHh0X70d2nKGGskc",
      Width: 900,
      Height: 1600,
      Preview: "TKIq_o4nNHDij[%g~qn$4:.8aeS$",
      DateTime: "2024-11-21T12:32:54Z",
      UserName: "Joost",
      Message: "#feeling-good Nice event!",
      UserAvatar: {
        CreationDate: new Date("2024-11-21T12:32:47Z"),
        ImageKey:
          "event-avatar/evt-OK77YZPYw2mqZFB/avt-nnwOVV75AH7ELcVrfW806IQ6IIY",
        Width: 460,
        Height: 460,
        Preview: "TAGu5Wx$C%$:Ue9jpw-M~X%ysh?a",
      },
      Tags: {
        "custom:test1": "122345",
        "custom:test2": "1234567890",
        "custom:test3": "1234:%567890",
        "hashtag:feeling-good": "true",
      },
    },
  ],
};
