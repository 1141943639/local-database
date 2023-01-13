import { ValueOf } from 'types/utils_type';
import { UserErrorCode } from './user_error_code';

enum A {
  a = 421,
}

type d = `${UserErrorCode}`;

export type ErrorCodeValueType = string;

export type SuccessCode = 0;
