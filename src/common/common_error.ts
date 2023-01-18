import {
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_HTTP_STATUS,
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_RES_CODE,
} from 'common/constant';
import { CommonResType } from 'types/common/common_api_type';
import { CommonErrorType } from 'types/common/common_error_type';

export default class CommonError implements CommonErrorType {
  message: string = DEFAULT_ERROR_MESSAGE;
  httpStatus: number = DEFAULT_ERROR_HTTP_STATUS;
  errorCode: number = DEFAULT_ERROR_CODE;
  error: Error = new Error(this.message);

  constructor(res?: Partial<CommonErrorType>) {
    const { message, httpStatus, errorCode } = res || {};
    message && (this.message = message);
    httpStatus && (this.httpStatus = httpStatus);
    errorCode && (this.errorCode = errorCode);
    this.error = new Error(this.message);
  }
}
