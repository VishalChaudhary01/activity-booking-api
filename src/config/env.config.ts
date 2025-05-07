import { getEnv } from '@/utils/get-env';

export const envConfig = () => ({
  PORT: getEnv('PORT', '5001'),
  BASE_PATH: getEnv('BASE_PATH', '/api/v1'),
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  DATABASE_URL: getEnv('DATABASE_URL'),
  JWT_SECRET: getEnv('JWT_SECRET', 'my-secret'),
  JWT_EXPIRES_IN: getEnv('JWT_EXPIRES_IN', '1d'),
});

export const Env = envConfig();
