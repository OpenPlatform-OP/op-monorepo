import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app/modules/app.module';

export const DEFAULT_PORT = 6666;

async function bootstrap() {
  if (process.env.NODE_ENV) {
    dotenv.config({
      path: `.env.${process.env.NODE_ENV}`,
    });
  }

  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://oppf.dev:3000/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  const port = process.env.PORT || DEFAULT_PORT;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
