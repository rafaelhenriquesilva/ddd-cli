import { PeopleTemplateEntity } from "../../../domain/entities"
import { PeopleTemplateRepositoryInterface } from "../../../domain/repositories"
import { DatabaseConnection } from "../../database/database-connection"

export class PeopleTemplateRepository implements PeopleTemplateRepositoryInterface {
    connection: DatabaseConnection
    tableName: string

    constructor() {
        this.connection = DatabaseConnection.getInstance()
        this.tableName = 'public.people'
    }

    async listAll(): Promise<PeopleTemplateEntity[]> {
        const SchemaModel = await this.connection.find({
            table: this.tableName,
            fields: [
                { name: '*' }
            ]
        })

        return SchemaModel.map((row: any) => this.mapRowToEntity(row))

    }

    async insert(input: Partial<PeopleTemplateEntity>): Promise<Partial<PeopleTemplateEntity>[]> {
        return await this.connection.insert({
            fields: [
                { name: 'name', value: input.name },
                { name: 'age', value: input.age },
                { name: 'birth_date', value: input.birthDate },
            ],
            table: this.tableName,
            retuning: {
                name: 'id'
            }
        })
    }

    async findById(id: number): Promise<PeopleTemplateEntity[]> {
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

    async update(input: Partial<PeopleTemplateEntity>): Promise<void> {
        await this.connection.update({
            fields: [
                { name: 'name', value: input.name },
                { name: 'age', value: input.age },
                { name: 'birth_date', value: input.birthDate },
            ],
            table: this.tableName,
            where: [{
                name: 'id',
                value: input.id
            }]
        })
    }

    async deleteById(id: string | number): Promise<void> {
        await this.connection.delete({
            table: this.tableName,
            where: [{
                name: 'id',
                value: id
            }]
        })
    }

    private mapRowToEntity(row: any) {
        return new PeopleTemplateEntity({
            id: row.id,
            name: row.name,
            age: row.age,
            birthDate: row.birth_date,
            createdAt: row.created_at,
            updatedAt: row.updated_at
        })
    }

}