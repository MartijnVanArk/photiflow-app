import { NAME_PREFIXES } from "../../constants/nameprefixes";

export type ParsedNameParts = {
  first: string;
  last: string;
  prefix: string;
};

export const parseNameParts = (name: string): ParsedNameParts => {
  const testname = name.toLowerCase();
  for (let i = 0; i < NAME_PREFIXES.length; i++) {
    const p = testname.indexOf(" " + NAME_PREFIXES[i] + " ");
    if (p > 0) {
      return {
        first: name.slice(0, p).trim(),
        last: name.slice(p + NAME_PREFIXES[i].length + 1).trim(),
        prefix: name.slice(p + 1, p + NAME_PREFIXES[i].length + 1).trim(),
      };
    }
  }

  const parts = name.trim().split(" ");

  return {
    first: parts.shift() || parts[0],
    last: parts.join(" "),
    prefix: "",
  };
};

export const getNameAbbreviaton = (name: string, maxletters = 2): string => {
  const info = parseNameParts(name);
  const res: string[] = [info.first && info.first.length ? info.first[0] : ""];

  let i = 0;
  while (res.length < maxletters && i < info.last.length) {
    res.push(info.last[i]);
    i++;
  }

  return res.join("").toUpperCase() || "XX";
};

export const getNameInitials = (name: string): string => {
  const info = parseNameParts(name);
  return (
    info.first.slice(0, 1).toUpperCase() +
    (info.last.slice(0, 1).toUpperCase() || "")
  );
};
