import { Type } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { apiBootstrap } from './api.bootstrap';

export const bootstrap = async <T>(AppModule: Type<T>) => {
  const app = await NestFactory.create(AppModule);

  await app.startAllMicroservices();

  await apiBootstrap(app);
};
