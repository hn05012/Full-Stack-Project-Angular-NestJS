/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { OrmMetadata } from './app/config/orm-metadata';
import ormConfig from './app/config/orm.config';

async function bootstrap() {
  await OrmMetadata.init(ormConfig);
  await OrmMetadata.synchronizeDbSchema();

  const app = await NestFactory.create(AppModule);

  // Enable CORS for localhost:4200
  app.enableCors({
    origin: '*', // Allow requests from any URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Enable cookies if needed
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
