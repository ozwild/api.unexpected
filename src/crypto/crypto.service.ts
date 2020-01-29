import crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { ApiConfigService } from '../config';

const IV_LENGTH = 16; // For AES, this is always 16

@Injectable()
export class CryptoService {
  constructor(private readonly apiConfigService: ApiConfigService) {}

  private getDefaultEncryptionKey(): string {
    const { securityConfig } = this.apiConfigService;
    return securityConfig.encryptionKey;
  }

  encrypt(text: string, key = this.getDefaultEncryptionKey()): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  decrypt(text: string, key = this.getDefaultEncryptionKey()): string {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);

    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}
