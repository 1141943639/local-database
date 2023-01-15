import CommonError from 'common/common_error';
import { CommonRes } from 'common/common_res';
import { DEFAULT_ERROR_CODE, DEFAULT_ERROR_HTTP_STATUS } from 'common/constant';
import { NextFunction, Request, Response } from 'express';
import { isNativeError } from 'util/types';

export default function errorHandleMiddleWare(
  err: CommonError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const commonError = err as CommonError;
  res?.status?.(commonError?.httpStatus || DEFAULT_ERROR_CODE);

  // 处理原生错误
  if (isNativeError(err)) {
    console.error(err);
    res.json(
      new CommonRes({
        message: err.message,
        code: DEFAULT_ERROR_CODE,
      })
    );
  } else {
    // 处理自定义错误
    console.error(err.error);
    res.json(
      new CommonRes({
        message: err.message,
        code: err.errorCode,
      })
    );
  }
  next();
}
