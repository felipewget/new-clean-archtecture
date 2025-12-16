import { DatabaseModel } from 'src/@application/@core/infrastructure/database/database.model';
import { Entity } from 'typeorm';

@Entity('users')
export class BrewdatBlueprintModel extends DatabaseModel {}
