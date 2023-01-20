import { CommonErrRes } from 'common/common_res';
import { USER } from 'common/table_name';
import userErrorType from 'error_type/user_error_type';
import { ServiceCreate } from 'types/common/common_service_type';
import { UserModelType } from 'types/model/user_model_type';
import { commonService } from '../common/common_service';

const service = () => {
  const service = commonService<UserModelType>(USER);
  const create: ServiceCreate<typeof service> = async (data) => {
    try {
      return await service.insert(data, '*');
    } catch (err) {
      console.error(err);
      throw new CommonErrRes(userErrorType.userCreateFail);
    }
  };
  const expand = { create };
  Object.assign(service, expand);

  return service as typeof service & typeof expand;
};

export const userService = service();
