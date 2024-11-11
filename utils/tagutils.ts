export const mapFromTags = (tags: string[]) => {
  const map = new Map<string, string>();
  tags.forEach((t) => map.set(t, t));
  return map;
};

export const formatTagMap = (tags: Map<string, string>): string => {
  return tags.size > 0
    ? "#" + Array.from(tags.values()).reduce((p, c) => p + " #" + c)
    : "";
};

export const addTagsToMap = (
  tags: string[],
  map: Map<string, string>,
): Map<string, string> => {
  tags.forEach((t) => {
    if (!map.has(t)) map.set(t, t);
  });
  return map;
};
