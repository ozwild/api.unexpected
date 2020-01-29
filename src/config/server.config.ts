import { registerAs } from '@nestjs/config';

export interface ServerConfig {
  port: number;
}

export const loadServerConfigFromEnv = (): ServerConfig => ({
  port: parseInt(process.env.PORT, 10) || 3000,
});

export default registerAs('server', loadServerConfigFromEnv);
