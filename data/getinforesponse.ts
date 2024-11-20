import { GetInfoCommandOutput } from "@partystream/client-app";

export const TestEventResponse: GetInfoCommandOutput = {
  $metadata: {
    httpStatusCode: 200,
    attempts: 1,
    totalRetryDelay: 0,
  },
  Event: {
    BackgroundImage: {
      Height: 1600,
      ImageId: "emi-N2E9AsH14eEMHh0X70d2nKGGskc",
      ImageKey:
        "event-media/evt-OK77YZPYw2mqZFB/emi-N2E9AsH14eEMHh0X70d2nKGGskc",
      Preview: "TKIq_o4nNHDij[%g~qn$4:.8aeS$",
      Width: 900,
    },
    CreationDate: new Date("2024-11-18T09:04:05.000Z"),
    EventDate: new Date("2024-11-20T00:00:00.000Z"),
    EventId: "evt-OK77YZPYw2mqZFB",
    IntroImage: {
      Height: 535,
      ImageId: "emi-hsAOkGP7s4SSd7JEZG3i0zhyAjY",
      ImageKey:
        "event-media/evt-OK77YZPYw2mqZFB/emi-hsAOkGP7s4SSd7JEZG3i0zhyAjY",
      Preview: "TTL}BE%M_3~qayj[%MRjD%-;j[Rj",
      Width: 526,
    },
    LastUpdateDate: new Date("2024-11-20T12:42:54.116Z"),
    Name: "Bruiloft Marianne & Joost",
    OwnerId: "auth0|671eb66b0300c968a3e4b69c",
    State: "active",
    WelcomeMessage: "Maak wat foto's en kijk ze direct terug op de beamer",
    WelcomeTitle: "Welkom op onze bruiloft",
  },
  MetaData: {
    CdnUrl: "https://d1q5xw87zbwn28.cloudfront.net/",
  },
  Source: {
    CreationDate: new Date("2024-11-18T09:04:05.000Z"),
    EventId: "evt-OK77YZPYw2mqZFB",
    LastUpdateDate: new Date("2024-11-18T09:04:05.000Z"),
    Name: "default",
    OwnerId: "auth0|671eb66b0300c968a3e4b69c",
    SourceId: "src-2lXirrvabfIf4FK",
    WelcomeMessage: "",
    WelcomeTitle: "",
  },
};
