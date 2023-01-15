import { DEFAULT_RES_CODE, DEFAULT_RES_MESSAGE } from 'common/constant';
import { CommonResType } from 'types/common/common_api_type';

export class CommonRes<T = unknown> implements CommonResType<T | null> {
  message: string = DEFAULT_RES_MESSAGE;
  code: number = DEFAULT_RES_CODE;
  result: T | null = null;

  constructor(res: Partial<CommonResType<T>>) {
    const { message, result, code } = res || {};

    message && (this.message = message);
    result && (this.result = result);
    code && (this.code = code);
  }
}
