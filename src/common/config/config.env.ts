import { ENV, IConfig } from './config.interface';

export const configuration = (): IConfig => ({
  env: (process.env['NODE' + '_ENV'] as ENV) || ENV.DEFAULT,
  app: {
    endpoint: process.env.APP_ENDPOINT || 'app.candy.com',
    version: process.env.APP_VERSION || 'v1',
  },
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
});
