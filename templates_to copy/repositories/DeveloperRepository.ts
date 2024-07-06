
import { DeveloperEntity } from "../entities/DeveloperEntity"
import { DatabaseConnection } from "../../src/infra/database/database-connection"
import { GlobalRepositoryInterface } from "../interfaces/repositories/GlobalRepositoryInterface"
export class DeveloperRepository implements GlobalRepositoryInterface<DeveloperEntity> {
    connection: DatabaseConnection
    tableName: string

    constructor() {
        this.connection = DatabaseConnection.getInstance()
        this.tableName = 'public.developer'
    }

    async listAll(): Promise<DeveloperEntity[]> {
        const SchemaModel = await this.connection.find({
            table: this.tableName,
            fields: [
                { name: '*' }
            ]
        })

        return SchemaModel.map((row: any) => this.mapRowToEntity(row))

    }

    private mapRowToEntity(row: any) {
        return new DeveloperEntity({

            id: row.id,
            name: row.name,
            email: row.email,
            createdAt: row.created_at,
            updatedAt: row.updated_at,

        })
    }

    async deleteById(id: string): Promise<void> {
        await this.connection.delete({
            table: this.tableName,
            where: [{
                name: 'id',
                value: id
            }]
        })
    }

    async findById(id: string): Promise<DeveloperEntity[]> {
        const SchemaModel = await this.connection.find({
            table: this.tableName,
            fields: [
                { name: '*' }
            ],
            where: [{
                name: 'id',
                value: id
            }]
        })

        return SchemaModel.map((row: any) => this.mapRowToEntity(row))

    }

    async insert(input: Partial<DeveloperEntity>): Promise<Partial<DeveloperEntity[]>> {
        return await this.connection.insert({
            fields:
                [{ name: 'name', value: input.name },
                { name: 'email', value: input.email },
                ], table: this.tableName,
            retuning: {
                name: 'id'
            }
        })
    }


    async update(input: Partial<DeveloperEntity>): Promise<void> {
        await this.connection.update({
            fields:
                [{ name: 'name', value: input.name },
                { name: 'email', value: input.email },
                ], table: this.tableName,
            where: [{
                name: 'id',
                value: input.id
            }]
        })
    }
}