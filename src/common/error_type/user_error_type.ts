import { CommonErrorType } from 'types/common/common_error_type';

let userErrorType: {
  testError: CommonErrorType;
} = {
  testError: {
    errorCode: 1000,
    message: '测试错误',
  },
};

export default userErrorType;
