import { registerAs } from '@nestjs/config';

export interface SecurityConfig {
  encryptionKey: string;
}

export const loadSecurityConfigFromEnv = (): SecurityConfig => ({
  encryptionKey: process.env.ENCRYPTION_KEY,
});

export default registerAs('security', loadSecurityConfigFromEnv);
