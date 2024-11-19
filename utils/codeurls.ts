import Url from "url-parse";

export const parseCodeUrl = (
  url: string,
  wantPrefix: string = "src-",
): string => {
  const parsedUrl = new Url(url);

  const checkAgainst = (
    process.env.EXPO_PUBLIC_BASE_CODE_DOMAIN || ""
  ).toLowerCase();

  if (!url.toLowerCase().startsWith(checkAgainst)) return "";

  const pathElements = parsedUrl.pathname.split("/");

  const finalPath = pathElements.pop();

  if (!finalPath) return "";

  if (finalPath.startsWith(wantPrefix)) {
    return finalPath;
  }

  return "";
};
