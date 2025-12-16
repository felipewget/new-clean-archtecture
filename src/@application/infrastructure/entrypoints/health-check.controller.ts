import { Controller, Get } from '@nestjs/common';

@Controller('health-checks')
export class HealthCheckController {
  @Get()
  getHealthCheck(): string {
    return 'healthy';
  }
}
