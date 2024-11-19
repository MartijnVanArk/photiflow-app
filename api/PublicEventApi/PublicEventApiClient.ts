import {
  AuthServiceClient,
  ConnectAppDeviceCommand,
} from "@partystream/client-device-auth";

import BaseApiHandler from "../BaseApiHandler";

export class PublicEventsApiClient extends BaseApiHandler {
  authClient: AuthServiceClient;

  constructor() {
    super();
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

      //     console.log("Register Device : ", command);

      this.authClient
        .send(command)
        .then((result) => {
          console.log("Result : ", result);

          // if (result.Success) {
          //   //            resolve(result.DeviceId);
          // } else {
          //   //          reject(result.Message); // TODO : better error handling
          //}
        })
        .catch((err) => {
          console.log("Error : ", err);
          //      reject(err);
        });
    });
  }
}

export const publicEventsApi = new PublicEventsApiClient();
