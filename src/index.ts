import app from 'app';
import config from 'config';

const { APP_PORT } = config;

app.listen(APP_PORT, () => {
  console.log(`\x1B[32mhttp://localhost:${APP_PORT}`);
});

console.log(`\x1B[32mmain pid: ${process.pid}`);

export default app;
