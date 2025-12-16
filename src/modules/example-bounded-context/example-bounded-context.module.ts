import { Module } from '@nestjs/common';
import { ExampleController } from './infrastructure/entrypoints/example.controller';
import { DoSomethingHandler } from './application/use-cases/do-something.handle';

@Module({
  controllers: [ExampleController],
  providers: [DoSomethingHandler],
})
export class ExampleBoundedContextModule {}
