import { createRouterJsonParse } from './create_router';

const router = createRouterJsonParse({ prefix: '/user' });

router.get<'/test', string, { userId: number }, { userId: number }>(
  '/test',
  (req, res, next) => {
    res.json();
    res.end();
    return next();
  }
);

export default router;
