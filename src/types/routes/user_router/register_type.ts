import { CommonResType } from 'types/common/common_api_type';

export interface RegisterResBodyType {
  username: string;
}

export type RegisterResType = CommonResType<RegisterResBodyType>;
