import { UserModelType } from 'types/model/user_model_type';

export interface InitRequestStateMiddlewareData {
  authToken: string;
  user: UserModelType;
}
