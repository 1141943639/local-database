import { createRouterJsonParse } from './create_router';

const router = createRouterJsonParse({ prefix: '/user' });

router.get('/register');

export default router;
