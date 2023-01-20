import { Knex } from 'knex';

export interface ExpandService<T extends {}> {
  create?: (exec: Knex.QueryBuilder<T, T[]>) => Promise<never | T[]>;
}
