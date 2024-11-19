import {
  AuthServiceClient,
  ConnectAppDeviceCommand,
} from "@partystream/client-device-auth";

import BaseApiHandler from "../BaseApiHandler";

export class PublicEventsApiClient extends BaseApiHandler {
  authClient: AuthServiceClient;

  constructor() {
    super("PublicEventsApiClientToken");
    this.authClient = new AuthServiceClient({
      endpoint: process.env.EXPO_PUBLIC_EVENTS_API_BASE_URL || "",
    });
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
}

export const publicEventsApi = new PublicEventsApiClient();
