import { CommonResType } from 'types/common/common_res_type';

export interface RegisterResBodyType {
  username: string;
}

export interface RegisterReqType {
  username: string;
  password: string;
}

export type RegisterResType = CommonResType<RegisterResBodyType>;
