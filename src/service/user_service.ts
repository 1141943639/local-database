import { USER } from 'common/table_name';
import { UserModelType } from 'types/model/user_model_type';
import { CommonService } from '../common/common_service';

class UserService extends CommonService<UserModelType> {
  constructor() {
    super(USER);
  }
}

export const userService = new UserService();
