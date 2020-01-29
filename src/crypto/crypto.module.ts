import { Module } from '@nestjs/common';
import { ApiConfigModule } from '../config';
import { CryptoService } from './crypto.service';

@Module({
  imports: [ApiConfigModule],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
