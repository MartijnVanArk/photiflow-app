export interface OwnerInfo {
  OwnerId: string;
  Name: string;
  Email: string;
}

export type EventState = "waiting_for_payment" | "active" | "deleted";

export type ImageTag = {
  Key: string;
  Value: string;
};

export interface EventInfo {
  EventId: string;
  OwnerId: string;
  Owner?: OwnerInfo;
  Name: string;
  EventType: string;
  WelcomeTitle: string;
  WelcomeMessage: string;
  BackgroundImage: string;
  IntroPhoto: string;
  CreationDate: string;
  LastUpdateDate: string;
  EventDate: string;
  EventState: EventState;
}

export interface SourceInfo {
  SourceId: string;
  OwnerId: string;
  Owner?: OwnerInfo;
  EventId: string;
  Event?: EventInfo;
  Name: string;
  CreationDate: string;
  LastUpdateDate: string;
  Active: boolean;
  AppliedTags: ImageTag[];
}

export interface CollectionInfo {
  SourceId: string;
  OwnerId: string;
  Owner?: OwnerInfo;
  EventId: string;
  Event?: EventInfo;
  SourceId: string;
  Source?: SourceInfo;
  Name: string;
  CreationDate: string;
  LastUpdateDate: string;
}
