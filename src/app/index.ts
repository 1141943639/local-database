import express from 'express';
import errorHandleMiddleWare from 'middleware/error_handle_middleware';
import initRequestStateMiddleware from 'middleware/init_request_state_middleware';
import mountRouter from 'routes';
import 'db';

const app = express();

app.use(initRequestStateMiddleware());
// 挂载路由
mountRouter(app);
app.use(errorHandleMiddleWare);

export default app;
