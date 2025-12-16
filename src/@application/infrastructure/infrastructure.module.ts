import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModulesModule } from 'src/modules/modules.module';
import { TypeOrmConfig } from './bootstrap/config/typeorm.config';
import { QueueModule } from './queue/queue.module';
import { HealthCheckController } from './entrypoints/health-check.controller';
import { CacheModule } from './cache/cache.module';
import { configs } from './bootstrap/config';

@Module({
  imports: [
    ModulesModule,
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      envFilePath: ['.env', '.env.development', '.env.production'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [TypeOrmConfig],
      useFactory: (config: TypeOrmConfig) => config,
    }),
    CacheModule,
    QueueModule,
  ],
  controllers: [HealthCheckController],
})
export class InfrastructureModule {}
