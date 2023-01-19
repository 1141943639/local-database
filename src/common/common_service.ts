import { sqlite, sqlite as sqliteDB } from 'db';
import knex, { Knex } from 'knex';
import { UserModelType } from 'types/model/user_model_type';

export class CommonService<T extends {}> {
  tableName: string;
  sqlite: Knex<T, T[]>;
  constructor(tableName: string) {
    this.tableName = tableName;
    this.sqlite = sqliteDB<T>(this.tableName) as any;
  }

  async create(data: Partial<T>, returning?: string) {
    return (await this.sqlite.insert(data as any, returning || '*'))[0];
  }
  createArray(data: Partial<T>[], returning: string): Promise<T[]> {
    return this.sqlite.insert(data as any, returning || '*') as any;
  }
}
