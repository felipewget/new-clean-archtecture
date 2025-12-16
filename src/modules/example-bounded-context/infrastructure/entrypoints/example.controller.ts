import { Controller, Get } from '@nestjs/common';
import { DoSomethingHandler } from '../../application/use-cases/do-something.handle';

@Controller('examples')
export class ExampleController {
  constructor(protected readonly doSomethingHandler: DoSomethingHandler) {}

  @Get()
  async getExample(): Promise<string> {
    return this.doSomethingHandler.execute();
  }
}
