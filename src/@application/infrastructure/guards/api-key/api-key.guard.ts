import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ApiKeyService } from './api-key.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      const key =
        req.headers['X-API-KEY'] ??
        req.headers['x-api-key'] ??
        req.query.api_key ?? '';

      return this.apiKeyService.isKeyValid(key);
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw new ForbiddenException();
      }

      throw new BadRequestException();
    }
  }
}
