export enum ENV {
  DEFAULT = 'default',
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  UAT = 'uat',
  PRODUCTION = 'production',
}

export interface IConfigApp {
  endpoint: string;
  version: string;
}

export interface IConfigDatabase {
  host: string;
  port: string;
}

export interface IConfig {
  env: ENV;
  app: IConfigApp;
  database: IConfigDatabase;
}
