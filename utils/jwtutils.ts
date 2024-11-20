import { jwtDecode, JwtPayload } from "jwt-decode";

export interface JwtEventPayload extends JwtPayload {
  "event-id": string;
  "owner-id": string;
  "source-id": string;
  scope: string;
}

export const basicJWTChecks = (jwt: string): boolean => {
  const decoded = jwtDecode<JwtPayload>(jwt);
  const now = new Date().getTime() / 1000;

  return (decoded.exp || 0) > now && (decoded.iat || 0) < now;
};

export const jwtEventInfo = (jwt: string): JwtEventPayload => {
  return jwtDecode<JwtEventPayload>(jwt);
};
