import { registerAs } from '@nestjs/config';

export interface RedisConfig {
  host: string;
  port: number;
  tls: boolean;
  prefix: string;
}

export const loadRedisConfigFromEnv = (): RedisConfig => ({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT, 10),
  tls: process.env.REDIS_TLS === 'true',
  prefix: process.env.REDIS_KEYS_PREFIX || `um-${process.env.NODE_ENV}`,
});

export default registerAs('redis', loadRedisConfigFromEnv);
