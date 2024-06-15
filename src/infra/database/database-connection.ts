import { DatabaseConnectionInterface } from "./@shared/database-connection-interface"
import PostgreSQLAdapter from "./postgres/postgres-adapter"

export class DatabaseConnection implements DatabaseConnectionInterface {
  private static instance: DatabaseConnection
  connection: PostgreSQLAdapter

  constructor() {
    this.connection = this.start()
  }
    
  static getInstance() {
    if(!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection()
    }   
    return DatabaseConnection.instance
  }

  start(): any {
    const port: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432
    const connection = new PostgreSQLAdapter({
      database: process.env.DB_NAME || 'playground',
      host: process.env.DB_HOST || 'localhost',
      password: process.env.DB_PASSWORD || '1234test',
      user: process.env.DB_USER || 'rafael.candido',
      port
    })

    return connection
  }
  async end(): Promise<void> {
    if(this.connection) await this.connection.close()
  }

  async query(query: string, values?: any[]): Promise<any[]> {
    if(!this.connection) this.connection = this.start()
    const queryResult = await this.connection.query(query, values)
    this.end()
    return queryResult
  }

}