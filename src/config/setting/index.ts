import { env } from 'config/env';


export const PLATFORM = {
  APP_NAME: env.APP_NAME,
  INFURA_RPC_ID: env.INFURA_RPC_ID,
  ALCHEMY_RPC_ID: env.ALCHEMY_RPC_ID,
};

export const LOCAL_STORAGE_KEYS = {
  REFRESH_TOKEN_KEY: 'refresh_token',
  ACCESS_TOKEN_KEY: 'access_token',
  LOGIN_TYPE: 'login_type',
  CONFIG: 'default_config',
  THEME: 'theme',
};
