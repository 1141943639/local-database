import { maxTemp, minTemp, requiredTemp } from './template';

let userErrorType = {
  usernameRequired: { message: requiredTemp, code: 1000 },
  usernameMin: { message: minTemp, code: 1001 },
  usernameMax: { message: maxTemp, code: 1002 },
  passwordRequired: { message: requiredTemp, code: 1003 },
  passwordMin: { message: minTemp, code: 1004 },
  passwordMax: { message: maxTemp, code: 1005 },
  usernameDup: {
    message: 'same username already exists',
    code: 1006,
  },
  usernameNotExist: {
    message: 'username not exist',
    code: 1007,
  },
  userCreateFail: {
    message: 'user creation failed',
    code: 1008,
  },
  userNotFound: {
    message: 'user not found',
    code: 1008,
  },
  incorrectPassword: {
    message: 'incorrect password',
    code: 1009,
  },
};

export default userErrorType;
