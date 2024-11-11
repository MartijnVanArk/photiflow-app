import {
  PartyAuthactions,
  PartyAuthActionTypes,
} from "@/actions/PartyAuthActions";
import { AppMainStorage, PARTY_ID_KEY, validatePartyId } from "@/lib/storage";
import { PartyInfo } from "@/types/partyinfo";

export type PartyAuthState = {
  isValidPartyId: boolean;
  partyId: string;
  loading: boolean;
  isTryingToJoin: boolean;
  partyInfo: PartyInfo | null;
};

export type PartyJoinResult = {
  didJoin: boolean;
};

export const fakeTestparty: PartyInfo = {
  Name: "Bruiloft Joost & Marianne",
  CreationDate: "2024-11-08 13:12:14",
  LastUpdateDate: "2024-11-08 13:12:14",
  OwnerId: "O12345",
  PartyDate: "2024-11-08 13:12:14",
  PartyId: "P1234567890",
  PartyState: "active",
  Owner: {
    Email: "martijn@mvanark.nl",
    Name: "Martijn van Ark",
    OwnerId: "O54321",
  },
};

export const PartyAuthReducer = (
  state: PartyAuthState,
  action: PartyAuthactions,
): PartyAuthState => {
  console.log("Party Auth Reducer: ", action);

  switch (action.type) {
    case PartyAuthActionTypes.LOADED: {
      const vp = validatePartyId(action.payload.partyId);

      return {
        ...state,
        partyId: vp ? action.payload.partyId : "",
        isValidPartyId: vp,
        loading: false,
        isTryingToJoin: false,
        partyInfo: vp ? fakeTestparty : null,
      };
    }

    case PartyAuthActionTypes.TRYJOINSTART: {
      return { ...state, isTryingToJoin: true };
    }

    case PartyAuthActionTypes.TRYJOINRESULT: {
      const hasParty = action.payload.party !== null;
      const partyId = hasParty ? action.payload.party!.PartyId : "";

      AppMainStorage.saveItem(PARTY_ID_KEY, partyId);

      return {
        ...state,
        isTryingToJoin: false,
        partyId: partyId,
        isValidPartyId: hasParty,
        partyInfo: action.payload.party,
      };
    }

    case PartyAuthActionTypes.LEAVE: {
      AppMainStorage.saveItem(PARTY_ID_KEY, "");
      return {
        ...state,
        isValidPartyId: false,
        partyId: "",
        loading: false,
        isTryingToJoin: false,
        partyInfo: null,
      };
    }
  }

  return state;
};
