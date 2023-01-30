import { CommonResType } from 'types/common/common_res_type';
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
  error: Error = new Error(this.message);

  constructor(config: Partial<CommonResType<null>>);
  constructor(message?: string, code?: number, httpStatus?: number);
  constructor(
    message?: string | Partial<CommonResType<null>>,
    code?: number,
    httpStatus?: number
  ) {
    let errRes = {
      message: DEFAULT_ERROR_MESSAGE,
      code: DEFAULT_ERROR_CODE,
    };
    if (typeof message === 'object') {
      errRes = {
        ...errRes,
        ...message,
      };
    } else if (typeof message === 'string') {
      message && (errRes.message = message);
    }

    code && (errRes.code = code);

    super(errRes);
    httpStatus && (this.httpStatus = httpStatus);
    this.error = new Error(this.message);
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
