import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';

import compression from 'compression';
import { corsBootstrap } from './cors.bootstrap';
import { AppConfig } from './config/app.config';

export const apiBootstrap = async (app: INestApplication) => {
  const appConfig = app.get<AppConfig>(AppConfig);

  corsBootstrap(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.setGlobalPrefix(appConfig.api.prefix);

  app.use(compression());

  await app.listen(appConfig.port, () => {
    Logger.log(`server listen on port ${appConfig.port}`);
  });
};
