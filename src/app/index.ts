import Koa from 'koa';
import koaBody from 'koa-body';

const app = new Koa();

app.use(koaBody()); // body解析

export default app;
