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

  async registerDevice(sourceID: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const command = new ConnectAppDeviceCommand({
        DeviceId: this.DEV_ID,
        ClientSecret: this.SECRET_ID || "",
        SourceId: sourceID,
      });

      this.authClient
        .send(command)
        .then((result) => {
          resolve(result.EventToken);
        })
        .catch((err) => {
          console.log("Error : ", err);
          resolve("");
        });
    });
  }
}

export const publicEventsApi = new PublicEventsApiClient();
