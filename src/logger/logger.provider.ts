import { Provider } from '@nestjs/common';
import { contextsForLoggers } from './logger.decorator';
import { ApiLogger } from './api-logger';

export function createTokenForLogger(context: string): string {
  return `ApiLogger${context}`;
}

function loggerFactory(logger: ApiLogger, context: string) {
  if (context) {
    logger.setContext(context);
  }
  return logger;
}

function createLoggerProvider(context: string): Provider<ApiLogger> {
  return {
    provide: createTokenForLogger(context),
    useFactory: logger => loggerFactory(logger, context),
    inject: [ApiLogger],
  };
}

export function createLoggerProviders(): Array<Provider<ApiLogger>> {
  return [...contextsForLoggers].map(createLoggerProvider);
}
