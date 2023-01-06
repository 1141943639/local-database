import { chunk } from 'lodash';
import {
  JsonParseOptionsType,
  JsonStrOptionsType,
} from 'types/utils/json_type';

export function jsonParse<T>(
  str: string,
  options?: JsonParseOptionsType
): T | undefined {
  try {
    return JSON.parse(str);
  } catch (err) {
    if (options?.throwError) throw err;
  }
}

export function jsonStr(value: unknown, options?: JsonStrOptionsType): string {
  return JSON.stringify(value);
}
