export function jsonParse<T>(str: string, throwError?: boolean): T | undefined {
  try {
    return JSON.parse(str);
  } catch (err) {
    if (throwError) throw err;
  }
}

export function jsonStr(value: unknown): string {
  return JSON.stringify(value);
}
