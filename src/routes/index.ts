import { Request, Response, NextFunction } from 'express';

export default function mountRouter(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // TODO 读取当前目录的所有router, 并且注册到app上

  next();
}
