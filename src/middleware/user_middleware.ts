import { Middleware } from 'types/express_type';
import { UserModelType } from 'types/model/user_model_type';
import { RegisterReqType } from 'types/routes/user_router/user_regeister_type';

// TODO 需要增加登录和注册的表单校验
export const verifyRegister: Middleware<RegisterReqType> = async (
  req,
  res,
  next
) => {
  const { body } = req;

  next();
};
