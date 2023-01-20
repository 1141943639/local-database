import { USER } from 'common/table_name';
import { ExpandService } from 'types/common/common_service_type';
import { UserModelType } from 'types/model/user_model_type';
import { commonService } from '../common/common_service';

export const userService = (() => {
  const service = commonService<UserModelType>(USER);

  service.create = async (exec) => {
    let res = await exec;
    return res;
  };

  return service as typeof service & Required<ExpandService<UserModelType>>;
})();
