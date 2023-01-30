import { CommonErrRes } from 'common/common_res';
import userErrorType from 'error_type/user_error_type';
import { userService } from 'service/user_service';
import { Middleware } from 'types/express_type';
import { UserLoginReqType } from 'types/routes/user_router/user_login_type';

export const checkExactlySame: Middleware<UserLoginReqType> = async (
  req,
  res,
  next
) => {
  const { username, password } = req.body;

  const userData = (await userService.where('username', username))[0];

  if (!userData) throw new CommonErrRes(userErrorType.userNotFound);
  if (userData.password !== password)
    throw new CommonErrRes(userErrorType.incorrectPassword);

  req.state.user = userData;
  next();
};
