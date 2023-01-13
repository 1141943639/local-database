import app from 'app';
import config from 'config';
import os from 'os';
import getIpAddress from 'utils/get_ip_address';

const { APP_PORT } = config;
const ipAddress = getIpAddress();

app.listen(APP_PORT, () => {
  console.log(`http://localhost:${APP_PORT}`);
  console.log(`http://${ipAddress}:${APP_PORT}`);
});

console.log(`main pid: ${process.pid}`);

export default app;
