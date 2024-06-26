import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto"

export class RepositoryTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    const variableMapperName = 'row'
    const fieldsToInsertOrUpdate =
            columns.filter(
              (data) => data.camelCaseColumnName !== "id" &&
                    data.camelCaseColumnName !== "createdAt" &&
                    data.camelCaseColumnName !== "updatedAt"
            )


    let template = `
        import { ${className}Entity } from "../entities/${className}Entity"
        import { DatabaseConnection } from "../../src/infra/database/database-connection"
        export class ${className}Repository {
            connection: DatabaseConnection
            tableName: string

            constructor() {
                this.connection = DatabaseConnection.getInstance()
                this.tableName = '${columns && columns.length > 0 ? columns[0].schema : 'x'}.${columns && columns.length > 0 ? columns[0].table : 'y'}'
            }

            async listAll(): Promise<${className}Entity[]> {
                const SchemaModel = await this.connection.find({
                table: this.tableName,
                fields: [
                    { name: '*' }
                ]
                })

                return SchemaModel.map((row: any) => this.mapRowToEntity(row))

            }

            private mapRowToEntity(${variableMapperName}: any) {
                return new ${className}Entity({\n
          `
    for (const column of columns) {
      template += `${column.camelCaseColumnName}: ${variableMapperName}.${column.columnName}, \n`
    }

    template += `  
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
                
              async findById(id: number): Promise<${className}Entity[]> {
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
                    
            async insert(input: Partial<${className}Entity>):Promise<Partial<${className}Entity[]>> {
                    return await this.connection.insert({
                        fields:\n[`

    for (const column of fieldsToInsertOrUpdate) {
      template += `{name: '${column.columnName}', value: input.${column.camelCaseColumnName} }, \n`
    }

    template += ` ], table: this.tableName,
                        retuning: {
                            name: 'id'
                        }
                    })
            }
                    
            
            async update(input: Partial<${className}Entity>): Promise<void> {
                await this.connection.update({
                    fields: \n[`
    for (const column of fieldsToInsertOrUpdate) {
      template += `{name: '${column.columnName}', value: input.${column.camelCaseColumnName} }, \n`
    }

    template += `], table: this.tableName,
                    where: [{
                        name: 'id',
                        value: input.id
                    }]
                })
            }`
    // for (const column of columns) {

    //   template += `${column.camelCaseColumnName}: ${column.dataTypeTS} \n`
    // }

    template += '}'
    return template
  }
}