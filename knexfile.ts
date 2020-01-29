import dotenv from 'dotenv';
dotenv.config();

import { Config } from 'knex';
import { loadKnexConfigFromEnv } from './src/config/database.config';

const config = loadKnexConfigFromEnv();

const createKnexConfig = (seedsFolder: string): Config => ({
  ...config,
  seeds: {
    directory: `./seeds/${seedsFolder}`,
  },
});

module.exports = {
  localhost: createKnexConfig('localhost'),
  dev: createKnexConfig('dev'),
  qa: createKnexConfig('dev'),
  staging: createKnexConfig('staging'),
  production: createKnexConfig('production'),
};
