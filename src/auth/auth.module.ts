import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AccountsModule } from '../app/accounts';
import { CryptoModule } from '../crypto';
import { UnexpectedMooseBasicStrategy } from './unexpected-moose-basic.strategy';

const passportModule = PassportModule.register({ defaultStrategy: 'moose' });

@Module({
  imports: [
    passportModule,
    forwardRef(() => AccountsModule),
    forwardRef(() => CryptoModule),
  ],
  providers: [UnexpectedMooseBasicStrategy],
  exports: [passportModule],
})
export class AuthModule {}
