import { Module } from '@nestjs/common';
import { ExampleBoundedContextModule } from './example-bounded-context/example-bounded-context.module';

@Module({
  imports: [ExampleBoundedContextModule]
})
export class ModulesModule {}
