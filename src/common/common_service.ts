import { sqlite as sqliteDB } from 'db';
import { Knex } from 'knex';

export class CommonService<T extends {}> {
  tableName: string;
  sqlite: Knex.QueryBuilder<T>;
  constructor(tableName: string) {
    this.tableName = tableName;
    this.sqlite = sqliteDB<T>(this.tableName);
  }

  async create(data: Partial<T>, returning?: string): Promise<T> {
    return (await this.sqlite.insert(data as any, returning || '*'))[0];
  }
  createArray(data: Partial<T>[], returning: string): Promise<T[]> {
    return this.sqlite.insert(data as any, returning || '*') as any;
  }
}
