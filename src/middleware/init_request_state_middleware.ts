import { NextFunction, Request, Response } from 'express';
import { InitRequestStateMiddlewareData } from 'types/middleware/init_request_state_middleware_type';

export default function initRequestStateMiddleware(
  defaultData?: InitRequestStateMiddlewareData
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    defaultData && (req.state = defaultData);
    next();
  };
}
