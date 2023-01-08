export interface FileDetailType<T> {
  path: string;
  data: T[];
  lines: number;
  length: number;
}

export interface ReadOptionType<T> {
  fileNames?: string[];
  callback?: (data: T | undefined, option: { path: string }) => void;
}
