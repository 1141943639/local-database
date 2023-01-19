import { CommonErrRes } from 'common/common_res';
import { maxTemp, minTemp, requiredTemp } from './template';

let userErrorType = {
  usernameRequired: new CommonErrRes(requiredTemp, 1000),
  usernameMin: new CommonErrRes(minTemp, 1001),
  usernameMax: new CommonErrRes(maxTemp, 1002),
  passwordRequired: new CommonErrRes(requiredTemp, 1003),
  passwordMin: new CommonErrRes(minTemp, 1004),
  passwordMax: new CommonErrRes(maxTemp, 1005),
  usernameDup: new CommonErrRes('same username already exists', 1006),
};

export default userErrorType;
