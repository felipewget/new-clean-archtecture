import {
  EntityManager,
  EntityTarget,
  ObjectLiteral,
  QueryRunner,
  Repository,
} from 'typeorm';

export const bindBaseMethods = <T extends ObjectLiteral>(
  repo: Repository<T>,
): BaseRepository<T> => {
  return new BaseRepository<T>(repo.target, repo.manager, repo.queryRunner);
};

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  constructor(
    target: EntityTarget<T>,
    manager: EntityManager,
    queryRunner?: QueryRunner,
  ) {
    super(target, manager, queryRunner);
  }

  get tableName(): string {
    return this.metadata.tableName;
  }
}
