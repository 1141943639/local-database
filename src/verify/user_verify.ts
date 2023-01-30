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
    async (value) => !(await userService.checkHasUserByUsername(value))
  ),
  password: passwordSchema,
});

/**
 * 详细的校验在checkExactlySame中间件 src\middleware\routes\user_middleware.ts
 */
export const loginSchema = object({
  username: usernameSchema,
  password: passwordSchema,
});

export const changePwdSchema = object({
  username: usernameSchema.test(
    'checkDup',
    handleErrMsg(userErrorType.userNotFound),
    userService.checkHasUserByUsername
  ),
  password: passwordSchema,
});
