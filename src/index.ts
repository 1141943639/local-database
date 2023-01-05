import app from 'app';
import config from 'config';
import User from 'model/user.model';

const { APP_PORT } = config;

User;

app.listen(APP_PORT, () => {
  console.log(`\x1B[32mhttp://localhost:${APP_PORT}`);
});
export default app;
