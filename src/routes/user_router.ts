import { userController } from 'controller/user_controller';
import { checkExactlySame } from 'middleware/routes/user_middleware';
import validateMiddleware from 'middleware/validate_middleware';
import {
  changePwdSchema,
  loginSchema,
  registerSchema,
} from 'verify/user_verify';
import { createRouterJsonParse } from './create_router';

const router = createRouterJsonParse({
  prefix: '/user',
  authWhiteList: ['/login', '/register'],
});

router.post(
  '/register',
  validateMiddleware(registerSchema),
  userController.register
);

router.post(
  '/login',
  validateMiddleware(loginSchema),
  checkExactlySame,
  userController.login
);

router.post(
  '/changePassword',
  validateMiddleware(changePwdSchema),
  userController.changePassword
);

export default router;
