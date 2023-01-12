declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: string;
      SQLITE_FILE_NAME: string;
      NODE_ENV: 'develop' | 'production';
    }
  }
}

export {};
