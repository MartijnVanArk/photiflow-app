export const includeTrailingSlash = (str: string): string => {
  return str.endsWith("/") ? str : `${str}/`;
};
