import { CommonSuccessRes } from 'common/common_res';
import { NextFunction, Request, Response } from 'express';
import { userService } from 'service/user_service';
import { Middleware } from 'types/express_type';
import { UserModelType } from 'types/model/user_model_type';
import { RegisterReqType } from 'types/routes/user_router/user_regeister_type';

class UserController {
  register: Middleware<RegisterReqType, UserModelType> = async (
    req,
    res,
    next
  ) => {
    const newUser = await userService.create(req.body);
    res.json(new CommonSuccessRes(newUser));
    next();
  };
}

export const userController = new UserController();
