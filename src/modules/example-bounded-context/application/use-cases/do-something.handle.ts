import { Handler } from 'src/@application/@core/interfaces/handler.interface';

export class DoSomethingHandler implements Handler {
  async execute() {
    // @internal example: to something
    return 'example';
  }
}
