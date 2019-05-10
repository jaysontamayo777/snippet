/* eslint-disable */
import appDevConfig from './app.dev.config.json';
import appSITConfig from './app.sit.config.json';
import appUATConfig from './app.uat.config.json';
import appProdConfig from './app.prod.config.json';

import rules from './rules.config.json';

let appConfig = {};

switch (process.env.REACT_APP_LOCATION) {
  case 'production':
    appConfig = appProdConfig;
    break;
  case 'uat':
    appConfig = appUATConfig;
    break;
  case 'sit':
    appConfig = appSITConfig;
    break;
  default:
    appConfig = appDevConfig;
}

const config = Object.assign({}, appConfig, rules);

export default config;
