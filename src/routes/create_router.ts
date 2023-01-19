import { json } from 'express';
import { asyncRouter } from 'utils/async_middleware_handle';
import { CreateRouterOption, MyRouter } from 'types/routes/routes_type';

export const createRouter = (option?: CreateRouterOption): MyRouter => {
  const routes = asyncRouter();
  const newRouter: MyRouter = routes;
  newRouter.option = option;

  return newRouter;
};

export const createRouterJsonParse: typeof createRouter = (...arg) => {
  const router = createRouter(...arg);

  router.use(json());

  return router;
};
