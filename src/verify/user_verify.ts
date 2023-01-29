import { string, object, ValidationError } from 'yup';
import { userService } from 'service/user_service';
import userErrorType from 'error_type/user_error_type';
import { handleErrMsg } from 'verify';

export const usernameSchema = string()
  .required(handleErrMsg(userErrorType.usernameRequired))
  .min(1, handleErrMsg(userErrorType.usernameMin))
  .max(10, handleErrMsg(userErrorType.usernameMax));
export const passwordSchema = string()
  .required(handleErrMsg(userErrorType.passwordRequired))
  .min(1, handleErrMsg(userErrorType.passwordMin))
  .max(20, handleErrMsg(userErrorType.passwordMax));

export const registerSchema = object({
  username: usernameSchema.test(
    'checkDup',
    handleErrMsg(userErrorType.usernameDup),
    async (value) => {
      const res = await userService.where('username', value);
      return !res?.[0];
    }
  ),
  password: passwordSchema,
});

export const loginSchema = object({
  username: usernameSchema,
  password: passwordSchema,
}).test('checkDup', async (value) => {
  const { username, password } = value;

  const userData = (await userService.where('username', username))[0];

  // TODO 返回 user not found
  if (!userData) return false;
  // TODO 返回错误 Incorrect password
  if (userData.password !== password) return false;

  return true;
});
