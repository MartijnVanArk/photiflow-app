import { GetInfoCommandOutput } from "@partystream/client-app";

export const TestEventResponse: GetInfoCommandOutput = {
  $metadata: { httpStatusCode: 200, attempts: 1, totalRetryDelay: 0 },
  Event: {
    BackgroundImage: {
      Height: 750,
      ImageId: "emi-X6cFSg3V9o5fJ0mn5Ol7BpqV8NQ",
      ImageKey:
        "event-media/evt-OK77YZPYw2mqZFB/emi-X6cFSg3V9o5fJ0mn5Ol7BpqV8NQ",
      Preview: "L9Nm.*~qof?bxuWBD%t7M{Rj%MRj",
      Width: 752,
    },
    CreationDate: new Date("2024-11-18T09:04:05.000Z"),
    EventDate: new Date("2024-11-20T00:00:00.000Z"),
    EventId: "evt-OK77YZPYw2mqZFB",
    IntroImage: {
      Height: 750,
      ImageId: "emi-X6cFSg3V9o5fJ0mn5Ol7BpqV8NQ",
      ImageKey:
        "event-media/evt-OK77YZPYw2mqZFB/emi-X6cFSg3V9o5fJ0mn5Ol7BpqV8NQ",
      Preview: "L9Nm.*~qof?bxuWBD%t7M{Rj%MRj",
      Width: 752,
    },
    LastUpdateDate: new Date("2024-11-18T18:48:21.463Z"),
    Name: "Party from httpyak",
    OwnerId: "auth0|671eb66b0300c968a3e4b69c",
    State: "active",
    WelcomeMessage:
      "Welcome to our great 2nd party. Please make some photo's to get the party started!",
  },
  MetaData: { CdnUrl: "https://d1q5xw87zbwn28.cloudfront.net/" },
  Source: {
    CreationDate: new Date("2024-11-18T09:04:05.000Z"),
    EventId: "evt-OK77YZPYw2mqZFB",
    LastUpdateDate: new Date("2024-11-18T09:04:05.000Z"),
    Name: "",
    OwnerId: "auth0|671eb66b0300c968a3e4b69c",
    SourceId: "src-2lXirrvabfIf4FK",
    WelcomeMessage: "",
  },
};
