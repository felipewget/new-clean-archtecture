import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE } from 'src/@application/@core/enums/queue.enum';

const queueNames = Object.values(QUEUE);
const registeredQueues = queueNames.map((name) =>
  BullModule.registerQueue({ name }),
);

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
      },
    }),
    ...registeredQueues,
  ],
  exports: [...registeredQueues],
})
export class QueueModule {}
