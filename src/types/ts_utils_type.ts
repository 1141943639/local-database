export type ValueOf<T> = T[keyof T];
export type PartialOmit<T, K extends keyof T> = Partial<Omit<T, K>> &
  Pick<T, K>;
export type ReadonlyOmit<T, K extends keyof T> = T & Readonly<Omit<T, K>>;
