import axios, { AxiosInstance } from "axios";
import { nativeApplicationVersion } from "expo-application";
import { Platform } from "react-native";

import { EventInfo } from "@/types/eventinfo";

export class PublicEventsApi {
  public readonly EventsClient: AxiosInstance;

  private abortController = new AbortController();

  constructor() {
    this.EventsClient = axios.create({
      baseURL: process.env.EXPO_PUBLIC_EVENTS_API_BASE_URL,
    });

    this.EventsClient.interceptors.request.use(
      (config) => {
        config.signal = this.abortController.signal;
        config.headers["X-Photobooth-version"] = nativeApplicationVersion;
        config.headers["X-Photobooth-os"] = Platform.OS;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  tryJoinEvent(withId: string): Promise<EventInfo> {
    return new Promise<EventInfo>((resolve, reject) => {
      this.EventsClient.post("/event/tryjoin", {
        EventId: withId,
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  leaveEvent(withId: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {});
  }

  getEvent(withId: string): Promise<EventInfo> {
    return new Promise<EventInfo>((resolve, reject) => {});
  }
}

const publicEventsApi = new PublicEventsApi();

export default publicEventsApi;
