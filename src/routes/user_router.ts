import { userController } from 'controller/user_controller';
import validateMiddleware from 'middleware/validate_middleware';
import { loginSchema, registerSchema } from 'verify/user_verify';
import { createRouterJsonParse } from './create_router';

const router = createRouterJsonParse({
  prefix: '/user',
  authWhiteList: ['*'],
});

router.post(
  '/register',
  validateMiddleware(registerSchema),
  userController.register
);

router.post('/login', validateMiddleware(loginSchema));

export default router;
