import express from 'express';
import errorHandleMiddleWare from 'middleware/error_handle_middleware';
import initRequestStateMiddleware from 'middleware/init_request_state_middleware';
import mountRouter from 'routes';

const app = express();

// 挂载路由
app.use(initRequestStateMiddleware());
mountRouter(app);
app.use(errorHandleMiddleWare);

export default app;
