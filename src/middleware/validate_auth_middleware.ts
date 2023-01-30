import { Middleware } from 'types/express_type';
import { ValidateAuthMiddlewareOptions } from 'types/middleware/validate_auth_middleware_type';
import jwt from 'jsonwebtoken';
import config from 'config';
import authErrorType from 'error_type/auth_error_type';
import { CommonErrRes } from 'common/common_res';
import { JwtPayloadType } from 'types/jwt';

export const validateAuthMiddleware: (
  options?: ValidateAuthMiddlewareOptions
) => Middleware = (options) => (req, res, next) => {
  const { whiteList = [] } = options || {};
  const token = req.headers?.authorization;

  if (whiteList.includes(req.originalUrl) || whiteList.includes('*'))
    return next();
  if (!token) {
    throw new CommonErrRes(authErrorType.missingToken);
  }

  let data: JwtPayloadType['data'];

  try {
    data = (jwt.verify(token, config.JWT_SECRET) as JwtPayloadType).data;
  } catch (e) {
    const err = e as Error;

    if (err.name === 'JsonWebTokenError') {
      throw authErrorType.tokenExpired;
    }

    err.message = err.message.replace(/jwt/g, 'token');
    throw err;
  }

  req.state = { ...req.state, ...data };

  next();
};
