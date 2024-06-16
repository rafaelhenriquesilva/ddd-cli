import { DatabaseConnectionInterface } from "./@shared/database-connection-interface"
import { SelectQueryInterface, InsertQueryInterface, UpdateQueryInterface, DeleteQueryInterface } from "./@shared/query-interface"
import PostgreSQLAdapter from "./postgres/postgres-adapter"

export class DatabaseConnection implements DatabaseConnectionInterface {
    private static instance: DatabaseConnection;
    private connection: PostgreSQLAdapter | null = null;

    private constructor() {}

    static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }

    private start(): PostgreSQLAdapter {
        const port: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
        return new PostgreSQLAdapter({
            database: process.env.DB_NAME || 'playground',
            host: process.env.DB_HOST || 'localhost',
            password: process.env.DB_PASSWORD || '1234test',
            user: process.env.DB_USER || 'rafael.candido',
            port
        });
    }

    async getConnection(): Promise<PostgreSQLAdapter> {
        if (!this.connection) {
            this.connection = this.start();
        }
        return this.connection;
    }

    async closeConnection(): Promise<void> {
        if (this.connection) {
            await this.connection.close();
            this.connection = null;
        }
    }

    async query(query: string, values?: any[]): Promise<any[]> {
        const connection = await this.getConnection();
        try {
            return await connection.query(query, values);
        } finally {
            await this.closeConnection();
        }
    }

    async find(input: SelectQueryInterface): Promise<any[]> {
        const connection = await this.getConnection();
        try {
            return await connection.find(input);
        } finally {
            await this.closeConnection();
        }
    }

    async insert(input: InsertQueryInterface): Promise<any[]> {
        const connection = await this.getConnection();
        try {
            return await connection.insert(input);
        } finally {
            await this.closeConnection();
        }
    }

    async update(input: UpdateQueryInterface): Promise<any[]> {
        const connection = await this.getConnection();
        try {
            return await connection.update(input);
        } finally {
            await this.closeConnection();
        }
    }

    async delete(input: DeleteQueryInterface): Promise<any[]> {
        const connection = await this.getConnection();
        try {
            return await connection.delete(input);
        } finally {
            await this.closeConnection();
        }
    }
}
