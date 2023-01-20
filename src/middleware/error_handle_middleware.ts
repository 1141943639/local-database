import { CommonErrRes } from 'common/common_res';
import config from 'config';
import { NextFunction, Request, Response } from 'express';
import { isNativeError } from 'util/types';
import { CommonErrorType } from 'types/error_type';

export default function errorHandleMiddleWare(
  err: CommonErrRes | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let commonError = err as CommonErrRes;

  // 将原生错误转为自定义错误
  if (isNativeError(err)) {
    commonError = new CommonErrRes(
      config.NODE_ENV === 'develop' ? err.message : ''
    );
  } else if (!(err instanceof CommonErrRes)) {
    commonError = new CommonErrRes(config.NODE_ENV === 'develop' ? err : '');
  }

  res?.status?.(commonError.httpStatus);
  console.error(commonError.error);
  res.json(commonError.getResult());

  next();
}
