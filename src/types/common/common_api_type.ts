import { ErrorCode, ErrorCodeValueType } from 'common/code';
import { ValueOf } from 'types/utils_type';

export interface CommonRes<T = unknown> {
  code: string;
  result: T;
  message: string;
}
