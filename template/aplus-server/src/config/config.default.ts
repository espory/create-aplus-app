import { EggAppConfig, EggAppInfo, PowerPartial } from 'midway';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1589696235680_2533';

  // add your config here
  config.middleware = [
  ];

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: 'aplus@2020',
      db: 0,
    }
  };

  config.view = {
    mapping: {
      '.ejs': 'ejs',
    },
    defaultViewEngine: 'ejs',
    defaultExtension: '.ejs',
  };

  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.sessionRedis = {
    key: 'APLUS_ID',
    maxAge: 72 * 3600 * 1000,
    httpOnly: true,
    encrypt: false,
  };

  config.validate = {
    convert: true,
    widelyUndefined: true,
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['*'],
  };

  config.logger = {
    consoleLevel: 'DEBUG',
  };

  config.sequelize = {
    dialect: 'mysql',
    database: 'aplus-db',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'aplus@2020',
    timezone: '+08:00',
  };

  return config;
};
