import { CommonSuccessRes } from 'common/common_res';
import { NextFunction, Request, Response } from 'express';
import { userService } from 'service/user_service';
import { Middleware } from 'types/express_type';
import { UserModelType } from 'types/model/user_model_type';
import { UserLoginReqType } from 'types/routes/user_router/user_login_type';
import { UserRegisterReqType } from 'types/routes/user_router/user_regeister_type';
import jwt from 'jsonwebtoken';
import config from 'config';
import { JWT_EXPIRES } from 'common/constant';
import { UserChangePwdReqType } from 'types/routes/user_router/user_changePwd_type';

class UserController {
  register: Middleware<UserRegisterReqType, UserModelType> = async (
    req,
    res,
    next
  ) => {
    const newUser = await userService.create(req.body);
    res.json(new CommonSuccessRes(newUser));
    next();
  };
  // TODO 增加user登录逻辑处理
  login: Middleware<UserLoginReqType, { token: string }> = async (
    req,
    res,
    next
  ) => {
    res.json(
      new CommonSuccessRes({
        token: jwt.sign(
          {
            data: {
              user: req.state.user,
            },
          },
          config.JWT_SECRET,
          { expiresIn: JWT_EXPIRES }
        ),
      })
    );
    next();
  };
  changePassword: Middleware<UserChangePwdReqType> = async (req, res, next) => {
    const { password } = req.body;
    const { id } = req.state.user;

    res.json(new CommonSuccessRes());
    next();
  };
}

export const userController = new UserController();
