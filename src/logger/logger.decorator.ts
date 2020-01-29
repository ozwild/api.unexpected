import { Inject } from '@nestjs/common';
import { createTokenForLogger } from './logger.provider';

export const contextsForLoggers = new Set<string>();

export function Logger(context = '') {
  contextsForLoggers.add(context);

  const token = createTokenForLogger(context);
  return Inject(token);
}
