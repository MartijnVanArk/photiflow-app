import {
  AppService,
  CreateFileUploadUrlCommand,
  GetInfoCommand,
  GetInfoCommandOutput,
} from "@partystream/client-app";
import {
  AuthServiceClient,
  ConnectAppDeviceCommand,
} from "@partystream/client-device-auth";
import axios, { Axios, AxiosInstance, AxiosResponse } from "axios";

import BaseApiHandler from "../BaseApiHandler";

export class PublicEventsApiClient extends BaseApiHandler {
  authClient: AuthServiceClient;

  public readonly uploadClient: AxiosInstance;

  constructor() {
    super("PublicEventsApiClientToken");
    this.authClient = new AuthServiceClient({
      endpoint: process.env.EXPO_PUBLIC_EVENTS_API_BASE_URL || "",
    });

    this.uploadClient = axios.create();
  }

  async registerDevice(sourceID: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const command = new ConnectAppDeviceCommand({
        DeviceId: this.DEV_ID,
        ClientSecret: this.SECRET_ID || "",
        SourceId: sourceID,
      });

      this.authClient
        .send(command)
        .then((result) => {
          this.setBearerToken(result.EventToken);
          resolve(true);
        })
        .catch((err) => {
          console.log("Error : ", err);
          resolve(false);
        });
    });
  }

  async getEventInfo(): Promise<GetInfoCommandOutput | null> {
    return new Promise<GetInfoCommandOutput | null>((resolve, reject) => {
      const appService = new AppService({
        endpoint: process.env.EXPO_PUBLIC_EVENTS_API_BASE_URL || "",
        token: async () => {
          return { token: this.BEARER_TOKEN };
        },
      });

      const cmd = new GetInfoCommand({});

      appService
        .send(cmd)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log("Error : ", err);
          resolve(null);
        });
    });
  }

  async makeUploadUrl(
    guestName: string,
    guestComment: string,
    guestTags: string[],
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const tags: Record<string, string> = {};

      guestTags.forEach((tag) => {
        tags[tag] = "true";
      });

      const cmd = new CreateFileUploadUrlCommand({
        Message: guestComment,
        Tags: tags,
      });

      const appService = new AppService({
        endpoint: process.env.EXPO_PUBLIC_EVENTS_API_BASE_URL || "",
        token: async () => {
          return { token: this.BEARER_TOKEN };
        },
      });

      appService
        .send(cmd)
        .then((result) => {
          resolve(result.Url);
        })
        .catch((err) => {
          console.log("Error : ", err);
          resolve("");
        });
    });
  }

  async uploadJpegPhoto(
    url: string,
    file: any,
  ): Promise<AxiosResponse<any, any> | null> {
    return new Promise<AxiosResponse<any, any> | null>((resolve, reject) => {
      this.uploadClient
        .put(url, file, {
          headers: {
            "Content-Type": "image/jpeg",
          },
        })
        .then((result) => {
          console.log("upload result: ", result);
          resolve(result);
        })
        .catch((err) => {
          console.log("Error : ", err);
          resolve(null);
        });
    });
  }
}

export const publicEventsApi = new PublicEventsApiClient();
