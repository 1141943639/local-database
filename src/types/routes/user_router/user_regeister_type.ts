import { CommonResType } from 'types/common/common_res_type';

export interface RegisterResBodyType {
  username: string;
}

export interface UserRegisterReqType {
  username: string;
  password: string;
}

export type UserRegisterResType = CommonResType<RegisterResBodyType>;
