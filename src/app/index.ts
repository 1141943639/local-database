import express, { Router } from 'express';
import mountRouter from 'routes';

const app = express();

// 挂载路由
app.use(mountRouter);

export default app;
