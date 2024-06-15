import pgPromise from 'pg-promise'
import { IDatabase, IMain } from 'pg-promise'
import { DeleteQueryInterface, InsertQueryInterface, SelectQueryInterface, UpdateQueryInterface } from '../@shared/query-interface';
import { PostgresQueryAdapter } from '../../adapters/postgres-query-adapter';

interface ConnectionConfig {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
}

export default class PostgresAdapter {
  private pgp: IMain
  private db: IDatabase<any>

  constructor(private readonly config: ConnectionConfig) {
    this.pgp = pgPromise()
    this.db = this.pgp(this.config)
    this.pgp.pg.defaults.max = 20
    this.pgp.pg.defaults.keepalives = 10
  }

  async query(query: string, values?: any[]): Promise<any> {
    try {
      return await this.db.any(query, values)
    } catch (error: any) {
      throw new Error(`Error executing query: ${error.message}`)
    }
  }

  async find(input: SelectQueryInterface): Promise<any[]> {
    try {
        return await this.query(PostgresQueryAdapter.find(input))
      } catch (error: any) {
        throw new Error(`Error executing find: ${error.message}`)
      }
  }

  async insert(input: InsertQueryInterface): Promise<any[]> {
    try {
        return await this.query(PostgresQueryAdapter.insert(input))
      } catch (error: any) {
        throw new Error(`Error executing insert: ${error.message}`)
      }
  }

  async update(input: UpdateQueryInterface): Promise<any[]> {
    try {
        return await this.query(PostgresQueryAdapter.update(input))
      } catch (error: any) {
        throw new Error(`Error executing update: ${error.message}`)
      }
  }

  async delete(input: DeleteQueryInterface): Promise<any[]> {
    try {
        return await this.query(PostgresQueryAdapter.delete(input))
      } catch (error: any) {
        throw new Error(`Error executing delete: ${error.message}`)
      }
  }

  async close() {
    await this.pgp.end()
  }

}
