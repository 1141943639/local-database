import bodyParser from 'body-parser';
import {
  Router,
  json,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import { join } from 'path';
import { CreateRouterOption, MyRouter } from 'types/routes/routes_type';

export const createRouter = (option?: CreateRouterOption): MyRouter => {
  const routes = Router();
  // const { prefix } = option || {};
  const newRouter: MyRouter = routes;
  newRouter.option = option;

  // Object.keys(routes).map((key) => {
  //   const fn = routes[key];
  //   let newValue = fn;

  //   if (typeof fn === 'function') {
  //     newValue = (...arg: Parameters<typeof fn>) => {
  //       const path = arg?.[0];

  //       if (prefix) {
  //         // 如果没有传入path 那么path默认指向prefix
  //         if (typeof path === 'function') {
  //           arg.splice(0, 0, prefix);
  //         }
  //       }

  //       return fn(...arg);
  //     };
  //   }

  //   newRouter[key] = newValue;
  // });

  return newRouter;
};

export const createRouterJsonParse: typeof createRouter = (...arg) => {
  const router = createRouter(...arg);

  router.use(json());

  return router;
};
