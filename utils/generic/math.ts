export const clamp = (
  value: number,
  lowerBound: number,
  upperBound: number,
) => {
  "worklet";
  return Math.min(Math.max(lowerBound, value), upperBound);
};

export interface Vector<T = number> {
  x: T;
  y: T;
}
