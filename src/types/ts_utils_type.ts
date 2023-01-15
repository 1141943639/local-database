export type ValueOf<T> = T[keyof T];
export type PartialOmit<T, K extends keyof T> = Partial<Omit<T, K>> &
  Pick<T, K>;
