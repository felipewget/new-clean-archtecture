import { Injectable, Logger } from '@nestjs/common';
import * as Redis from '@redis/client';

@Injectable()
export class CacheService {
  private logger: Logger;
  private redisClient: Redis.RedisClientType;

  constructor() {
    this.logger = new Logger(CacheService.name);
    this.createConnection();
  }

  private async createConnection() {
    this.redisClient = await Redis.createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    }).connect();
  }

  private standardizeKey(key: string) {
    return key.toLowerCase();
  }

  async setManyCaches<T extends Record<string, unknown>>(
    obj: T,
    time: number
  ): Promise<void> {
    const objKeys = Object.keys(obj);
    const multiClient = this.redisClient.multi();

    for (let index = 0; index < objKeys.length; index++) {
      const currentKey = objKeys[index] as keyof T;
      const valueFromKey = obj[currentKey];
      const standardizedKey = this.standardizeKey(String(currentKey));

      multiClient.set(standardizedKey, JSON.stringify(valueFromKey), {
        PX: time,
      });
    }

    await multiClient.exec();
  }

  async set<T>(key: string, value: T, time: number): Promise<void> {
    try {
      const standardizedKey = this.standardizeKey(key);
      const valueStringified = JSON.stringify(value);

      await this.redisClient.set(standardizedKey, valueStringified, {
        PX: time,
      });
    } catch (e) {
      this.logger.error(
        `Error while trying to set object in cache. key: ${key}`,
        e
      );
      throw e;
    }
  }

  async get<T = unknown>(key: string): Promise<T | string | null> {
    try {
      const standardizedKey = this.standardizeKey(key);
      const cachedValue = await this.redisClient.get(standardizedKey);

      if (cachedValue === null) return null;

      try {
        return JSON.parse(cachedValue as string) as T;
      } catch {
        return cachedValue as string;
      }
    } catch (e) {
      this.logger.error(
        `Error while trying to get and parse object from cache. key: ${key}`,
        e
      );
      await this.flushCache();
      return null;
    }
  }

  async flushCache() {
    await this.redisClient.flushAll();
  }
}
