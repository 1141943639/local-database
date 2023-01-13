import { each } from 'async';
import { Request, Response, NextFunction } from 'express';
import { readdir } from 'fs';
import { join } from 'path';
import { MyRouter } from 'types/routes/routes_type';
import fsWrap from 'utils/fs_wrap';

export default async function mountRouter(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // TODO 读取当前目录的所有router, 并且注册到app上
  const [dir] = await fsWrap<[string[]]>((cb) => readdir(__dirname, cb));

  await each(
    dir.filter((val) => /\.router/.test(val)),
    async (fileName, cb) => {
      const path = join(__dirname, fileName);
      let router: MyRouter | undefined = undefined;

      try {
        router = (await import(path))?.default;
      } catch (err) {
        console.error(err);
      }

      if (router) {
        const routePrefix = router?.option?.prefix;

        router.get('/', () => {
          console.log(124);
        });

        routePrefix ? req.app.use(routePrefix, router) : req.app.use(router);
      }

      cb();
    }
  );

  next();
}
