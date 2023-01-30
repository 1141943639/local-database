import app from 'app';
import chalk from 'chalk';
import config from 'config';
import getIpAddress from 'utils/get_ip_address';

const { APP_PORT } = config;
const ipAddress = getIpAddress();

app.listen(APP_PORT, () => {
  console.log(chalk.green(`http://localhost:${APP_PORT}`));
  console.log(chalk.green(`http://${ipAddress}:${APP_PORT}`));
});

console.log(chalk.green(`main pid: ${process.pid}`));

export default app;
