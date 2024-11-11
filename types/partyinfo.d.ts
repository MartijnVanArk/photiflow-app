export interface OwnerInfo {
  OwnerId: string;
  Name: string;
  Email: string;
}

export type PartyState = "waiting_for_payment" | "active" | "deleted";

export type ImageTag = {
  Key: string;
  Value: string;
};

export interface PartyInfo {
  PartyId: string;
  OwnerId: string;
  Owner?: OwnerInfo;
  Name: string;
  WelcomeMessage: string;
  BackgroundImage: string;
  IntroPhoto: string;
  CreationDate: string;
  LastUpdateDate: string;
  PartyDate: string;
  PartyState: PartyState;
}

export interface SourceInfo {
  SourceId: string;
  OwnerId: string;
  Owner?: OwnerInfo;
  PartyId: string;
  Party?: PartyInfo;
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
  PartyId: string;
  Party?: PartyInfo;
  SourceId: string;
  Source?: SourceInfo;
  Name: string;
  CreationDate: string;
  LastUpdateDate: string;
}
