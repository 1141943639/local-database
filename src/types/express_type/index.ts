import { Request, Response, NextFunction } from 'express';

type RequestPar<T> = T extends Request<infer P> ? P : unknown;
type RequestQ<T> = T extends Request<unknown, unknown, unknown, infer P>
  ? P
  : unknown;
export interface Middleware<
  ReqB = unknown,
  ResB = unknown,
  Par = RequestPar<Request>,
  Q = RequestQ<Request>
> {
  (req: Request<Par, ResB, ReqB, Q>, res: Response, next: NextFunction):
    | unknown
    | Promise<unknown>;
}
