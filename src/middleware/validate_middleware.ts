import { Middleware } from 'types/express_type';
import validate from 'verify';

const validateMiddleware: (
  schema: Parameters<typeof validate>[1],
  options?: Parameters<typeof validate>[2]
) => Middleware<any> = (schema, options) => async (req, res, next) => {
  await validate(req.body, schema, options);

  next();
};

export default validateMiddleware;
