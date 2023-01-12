module.exports = {
  apps: [
    {
      name: 'main',
      script: './src/index.ts',
      // interpreter: './node_modules/.bin/ts-node-dev.cmd',
      interpreter_args: '--inspect -r tsconfig-paths/register',
      watch: './src',
      log_file: './logs/logs.log',
      error_file: './logs/error_logs.log',
      source_map_support: true,
      exec_mode: 'cluster',
      instances: 1,
      env: {
        APP_PORT: 8090,
      },
    },
  ],

  // deploy: {
  //   production: {
  //     user: 'SSH_USERNAME',
  //     host: 'SSH_HOSTMACHINE',
  //     ref: 'origin/master',
  //     repo: 'GIT_REPOSITORY',
  //     path: 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy':
  //       'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': '',
  //   },
  // },
};
