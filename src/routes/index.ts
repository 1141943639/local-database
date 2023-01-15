import { each } from 'async';
import { Express, Request, Response, NextFunction } from 'express';
import { readdir, readdirSync } from 'fs';
import { join } from 'path';
import { MyRouter } from 'types/routes/routes_type';
import fsWrap from 'utils/fs_wrap';

export default function mountRouter(app: Express): void {
  const dir = readdirSync(__dirname);
  const ignoreDir = ['create_router.ts', 'index.ts'];

  dir
    .filter((val) => !ignoreDir.includes(val))
    .forEach((fileName) => {
      const path = join(__dirname, fileName);
      let router: MyRouter | undefined = undefined;

      try {
        router = require(path)?.default;
      } catch (err) {
        console.error(err);
      }

      if (router) {
        const routePrefix = router?.option?.prefix;

        routePrefix ? app.use(routePrefix, router) : app.use(router);
      }
    });
}
