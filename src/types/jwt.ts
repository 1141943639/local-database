import { UserModelType } from './model/user_model_type';
import { JwtPayload } from 'jsonwebtoken';

export interface JwtPayloadType extends JwtPayload {
  data: {
    user: UserModelType;
  };
}
