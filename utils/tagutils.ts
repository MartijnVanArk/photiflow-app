export const mergeTags = (
  newTags: string[],
  existingTags: string[],
): string[] => {
  const merged: string[] = [...existingTags];

  const checkTags: string[] = existingTags.map((t) => t.toLowerCase());

  const refTags = newTags.map((t) => t.toLowerCase());

  for (let i = 0; i < newTags.length; i++) {
    if (checkTags.indexOf(refTags[i]) < 0) merged.push(newTags[i]);
  }

  return merged;
};

export const formatTags = (tags: string[]): string => {
  return tags.length > 0 ? "#" + tags.reduce((p, c) => p + " #" + c) : "";
};
