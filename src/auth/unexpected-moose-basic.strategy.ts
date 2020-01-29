import { BasicStrategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AccountsService } from '../app/accounts';
import { IAccount } from '../app/accounts/interfaces';
import { IUser } from '../app/users/interfaces';
import { CryptoService } from '../crypto';
import { ApiLogger, Logger } from '../logger';

@Injectable()
export class UnexpectedMooseBasicStrategy extends PassportStrategy(BasicStrategy, 'moose') {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly cryptoService: CryptoService,
    @Logger('UnexpectedMooseBasicStrategy') private readonly logger: ApiLogger,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<IUser> {
    this.logger.debug(`Validating user ${username}`);

    const account = await this.accountsService.findByTwilioAccountSid(username, '[twilioApiKey]');
    if (!account) {
      this.logger.debug(`No account found with id ${username}`);
      throw new UnauthorizedException();
    }

    const { twilioApiKey } = account;
    if (!twilioApiKey) {
      this.logger.debug(`Account ${username} has no Twilio API key`);
      throw new UnauthorizedException();
    }

    const { apiKey, encryptedApiSecret } = twilioApiKey;
    const apiSecret = this.cryptoService.decrypt(encryptedApiSecret);

    this.logger.debug(
      `Using API key "${apiKey}" and secret "${apiSecret}" to validate token ${password}`,
    );

    const entity = await this.twilioService.validateFlexToken(
      password,
      username,
      apiKey,
      apiSecret,
    );

    if (!entity.valid) {
      throw new UnauthorizedException('Token is invalid');
    }

    this.logger.debug(`Flex token validator returned ${JSON.stringify(entity)} for ${username}`);
    return this.createUser(entity, account);
  }

  private createUser(entity: TwilioTokenEntity, account: IAccount): IUser {
    return {
      email: entity.realm_user_id,
      roles: entity.roles,
      account,
    };
  }
}
