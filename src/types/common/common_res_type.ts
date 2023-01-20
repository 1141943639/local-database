export interface CommonResType<T = unknown> {
  code: number;
  result: T | null;
  message: string;
}
