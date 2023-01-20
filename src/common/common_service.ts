import { sqlite as sqliteDB } from 'db';
import { Knex } from 'knex';
import { ExpandService } from 'types/common/common_service_type';

export const commonService = <T extends {}>(
  tableName: string
): Knex.QueryBuilder<T, T[]> & ExpandService<T> => {
  const sqlite = sqliteDB<T, T[]>(tableName);

  return sqlite;
};
