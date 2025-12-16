import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigType, registerAs } from '@nestjs/config';

export const config = registerAs<TypeOrmModuleOptions>(
  'typeorm',
  (): TypeOrmModuleOptions => {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      autoLoadEntities: true,

      // Connection pools
      extra: { max: 50, min: 5 },

      entities: [__dirname + '/../**/*.model{.ts,.js}'],
      synchronize: false,
      logging: ['error'],

      maxQueryExecutionTime: 30000,
      cache: {
        type: 'ioredis',
        duration: 60 * 1000,
        options: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
        },
      },
    };
  },
);

export default config;
export const TypeOrmConfig = config.KEY;
export type TypeOrmConfig = ConfigType<typeof config>;
