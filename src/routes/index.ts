import { Express } from 'express';
import { MyRouter } from 'types/routes/routes_type';
import processFilesInDirectory from 'utils/process_files_in_directory';

export default function mountRouter(app: Express): void {
  processFilesInDirectory<MyRouter>(
    __dirname,
    (router) => {
      if (router) {
        const routePrefix = router?.option?.prefix;

        routePrefix ? app.use(routePrefix, router) : app.use(router);
      }
    },
    {
      ignoreFile: ['create_router.ts', 'index.ts'],
    }
  );
}
