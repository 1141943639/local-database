import { InitRequestStateMiddlewareData } from 'types/middleware/init_request_state_middleware_type';

declare namespace Express {
  interface Request {
    state: InitRequestStateMiddlewareData;
  }
}
declare global {
  namespace Express {
    interface Request {
      state?: InitRequestStateMiddlewareData;
    }
  }
}
