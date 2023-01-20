import { Knex } from 'knex';

type TRecord<T> = T extends Knex.QueryBuilder<infer P, unknown> ? P : never;

export interface ServiceCreate<
  TBuilder extends Knex.QueryBuilder = Knex.QueryBuilder
> {
  (data: Parameters<TBuilder['insert']>[0]): Promise<TRecord<TBuilder>[]>;
}

export interface ExpandService<T extends {}> {
  create?: () => {};
  get?: () => {};
}
