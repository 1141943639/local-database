import { NextFunction, Request, Response } from 'express';
import { Middleware } from 'types/express_type';
import { RegisterReqType } from 'types/routes/user_router/user_regeister_type';

class UserController {
  register: Middleware<RegisterReqType> = (req, res) => {};
}

export default new UserController();
