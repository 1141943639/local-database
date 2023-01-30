import { UserModelType } from 'types/model/user_model_type';

export type UserLoginReqType = Omit<UserModelType, 'id'>;
