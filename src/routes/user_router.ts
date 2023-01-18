import { userController } from 'controller/user_controller';
import { createRouterJsonParse } from './create_router';

const router = createRouterJsonParse({ prefix: '/user' });

router.post('/register', userController.register);

export default router;
