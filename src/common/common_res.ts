import { CommonResType } from 'types/common/common_api_type';
import {
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_HTTP_STATUS,
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_VERIFY_ERROR_CODE,
  DEFAULT_RES_CODE,
  DEFAULT_RES_MESSAGE,
} from 'common/constant';
import { pick } from 'lodash';

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
  getResult(): CommonResType<T> {
    return pick(this, 'message', 'code', 'result');
  }
}

export class CommonErrRes extends CommonRes<null> {
  httpStatus: number = DEFAULT_ERROR_HTTP_STATUS;
  getError(): Error {
    return new Error(this.message);
  }
  getHttpStatus(): number {
    return this.httpStatus;
  }

  constructor(message?: string, code?: number, httpStatus?: number) {
    const errRes = {
      message: DEFAULT_ERROR_MESSAGE,
      code: DEFAULT_ERROR_CODE,
    };

    message && (errRes.message = message);
    code && (errRes.code = code);

    super(errRes);
    httpStatus && (this.httpStatus = httpStatus);
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

export class CommonVerifyErrorRes extends CommonErrRes {
  constructor(message: string) {
    super(message, DEFAULT_VERIFY_ERROR_CODE);
  }
}
