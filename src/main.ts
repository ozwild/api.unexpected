import { NestFactory } from '@nestjs/core';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app.module';

import { loadServerConfigFromEnv } from './config/server.config';
import { ApiLogger } from './logger';

function setupValidation(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
}

function setupSwagger(app: INestApplication) {
  const env = process.env.NODE_ENV || 'localhost';
  const options = new DocumentBuilder()
    .setTitle(`Unexpected Moose API (${env})`)
    .setVersion('1.0.0')
    .addTag('unexpected-moose')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const log = await app.resolve(ApiLogger);

  app.enableShutdownHooks();
  app.enableCors();

  app.use(compression);
  app.use(helmet);

  setupValidation(app);

  setupSwagger(app);

  const { port } = loadServerConfigFromEnv();

  await app.listen(port);

  log.log(`Running server on port ${port}`);
}

bootstrap();
