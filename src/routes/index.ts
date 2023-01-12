import bodyParser from 'body-parser';
import { Router } from 'express';
import { join } from 'path';
import { CreateRouterOption, RouterParserEnum } from 'types/routes/RoutesType';

const routes = Router();

export const createRouter = (option?: CreateRouterOption): typeof routes => {
  const { prefix, parser } = option || {};
  const newRoutes = routes;
  const _parser = (() => {
    switch (parser) {
      case RouterParserEnum.Json:
      default:
        return bodyParser.json();
    }
  })();

  Object.keys(routes).map((key) => {
    const fn = routes[key];
    let newValue = fn;

    if (typeof fn === 'function') {
      newValue = (...arg: Parameters<typeof fn>) => {
        const path = arg?.[0];

        if (typeof path === 'string' && prefix) {
          arg[0] = join(prefix, path);
        }

        return fn(...arg);
      };
    }

    newRoutes[key] = newValue;
  });

  return newRoutes;
};

export default routes;
