import { createRouterJsonParse } from './create_router';

const router = createRouterJsonParse({ prefix: '/user' });

router.get('/test', (req, res, next) => {
  res.send('Hello word');
  next();
});

export default router;
