import express from 'express';
import { mountRouter } from 'routes/create_router';

const app = express();

app.use(mountRouter);

export default app;
