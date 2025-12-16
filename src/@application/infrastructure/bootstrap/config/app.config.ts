import { ConfigType, registerAs } from '@nestjs/config';

export const config = registerAs('app', () => ({
  port: +(process.env.APP_PORT || 3000),
  api: {
    prefix: '/api',
  },
  cors: {
    isEnabled: true,
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
  defaults: {},
}));

export default config;
export const AppConfig = config.KEY;
export type AppConfig = ConfigType<typeof config>;
