// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lightOrDark = (color: any): string => {
  let r, g, b;

  if (color.match(/^rgb/)) {
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/,
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  return hsp > 127.5 ? "light" : "dark";
};

export const hueToRgb = (p: number, q: number, t: number): number => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

export const hslToRgb = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [
    Math.round(255 * f(0)),
    Math.round(255 * f(8)),
    Math.round(255 * f(4)),
  ];
};

export const stringToHSL = (
  text: string,
  saturation = 50,
  lightness = 70,
): [number, number, number] => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  return [hash % 360, saturation, lightness];
};

export type DynaTextColors = {
  background: string;
  backroundtrans: string;
  foreground: string;
};

export const generateColorsForText = (text: string): DynaTextColors => {
  const [h, s, l] = stringToHSL(text);
  const [r, g, b] = hslToRgb(h, s, l);
  const rgb = `rgb(${r}, ${g}, ${b})`;
  const rgba = `rgb(${r}, ${g}, ${b}, 0.2)`;
  const ld = lightOrDark(rgb);

  return {
    background: rgb,
    backroundtrans: rgba,
    foreground: ld === "light" ? "black" : "white",
  };
};
