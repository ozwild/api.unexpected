import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import database from './config/database.config';
import redis from './config/redis.config';
import server from './config/server.config';
import security from './config/security.config';

import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetsModule } from './assets/assets.module';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { HouseholdsModule } from './households/households.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database, redis, server, security]
    }),
    LoggerModule,
    AuthModule,
    AssetsModule,
    UsersModule,
    BookingsModule,
    HouseholdsModule,
    AccountsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
