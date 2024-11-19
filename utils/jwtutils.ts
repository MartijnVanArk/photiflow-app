import { jwtDecode, JwtPayload } from "jwt-decode";

export const basicJWTChecks = (jwt: string): boolean => {
  const decoded = jwtDecode<JwtPayload>(jwt);
  const now = new Date().getTime();

  return (decoded.exp || 0) > now && (decoded.iat || 0) < now;
};
