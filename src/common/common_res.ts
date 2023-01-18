import { DEFAULT_RES_CODE, DEFAULT_RES_MESSAGE } from 'common/constant';
import { CommonResType } from 'types/common/common_api_type';
import CommonError from './common_error';

export class CommonRes<T = unknown> implements CommonResType<T | null> {
  message: string = DEFAULT_RES_MESSAGE;
  code: number = DEFAULT_RES_CODE;
  result: T | null = null;

  constructor(res?: Partial<CommonResType<T>>) {
    const { message, result, code } = res || {};

    message && (this.message = message);
    result && (this.result = result);
    code && (this.code = code);
  }
}

export class CommonErrRes extends CommonRes<null> {
  constructor(res?: Partial<CommonResType<null>>) {
    const error = new CommonError(res);
    super(error);
  }
}

export class CommonSuccessRes<T> extends CommonRes<T> {
  constructor(result?: T, message?: string) {
    super({
      result,
      message,
    });
  }
}
