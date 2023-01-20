import { json } from 'express';
import { asyncRouter } from 'utils/async_middleware_handle';
import { CreateRouterOption, MyRouter } from 'types/routes/routes_type';
import { validateAuthMiddleware } from 'middleware/validate_auth_middleware';
import { join } from 'path';

export const createRouter = (option?: CreateRouterOption): MyRouter => {
  const routes = asyncRouter();
  const newRouter: MyRouter = routes;
  newRouter.option = option;

  return newRouter;
};

export const createRouterJsonParse: typeof createRouter = (...arg) => {
  const router = createRouter(...arg);
  const { authWhiteList = [], prefix = '' } = router.option || {};

  router.use(
    json(),
    validateAuthMiddleware({
      whiteList: authWhiteList.map((url) =>
        url === '*' ? url : [prefix, url].join('')
      ),
    })
  );

  return router;
};
