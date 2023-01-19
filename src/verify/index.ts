import { CommonErrRes } from 'common/common_res';
import { CommonErrorType } from 'types/error_type';
import { BaseSchema, ValidationError } from 'yup';

type validate2rdParams<T> = T extends (v: unknown, option: infer P) => unknown
  ? P
  : never;

export default async function validate<T = unknown, TContext extends {} = {}>(
  data: T,
  schema: BaseSchema<T, TContext, T>,
  options?: validate2rdParams<typeof schema.validate>
): Promise<T> {
  let res: T;
  try {
    res = await schema.validate(data, options);
  } catch (e) {
    const err = e as ValidationError;

    throw err.message;
  }
  return res;
}

export const handleErrMsg =
  (errType: CommonErrRes) =>
  (data: object): CommonErrRes => {
    errType.message =
      errType?.message?.replace(/{{[\d|\D]+?}}/g, (subString) => {
        const key = subString.replace(/{{([\d|\D]+)}}/, '$1');

        return data[key] || '';
      }) || errType?.message;

    return errType;
  };
