import app from 'app';
import config from 'config';
import ldb from 'db/local_database';

const { APP_PORT } = config;

ldb;

app.listen(APP_PORT, () => {
  console.log(`\x1B[32mhttp://localhost:${APP_PORT}`);
});
export default app;
