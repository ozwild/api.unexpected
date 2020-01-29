import { DynamicModule, Global } from '@nestjs/common';
import { ApiLogger } from './api-logger';
import { createLoggerProviders } from './logger.provider';

@Global()
export class LoggerModule {
  static forRoot(): DynamicModule {
    const loggerProviders = createLoggerProviders();
    return {
      module: LoggerModule,
      providers: [ApiLogger, ...loggerProviders],
      exports: [ApiLogger, ...loggerProviders],
    };
  }
}
