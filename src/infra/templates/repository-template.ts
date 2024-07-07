import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto"

export class RepositoryTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    const id: any = columns.find(data => data.camelCaseColumnName === 'id') || 'any'
    const variableMapperName = 'row'
    const variableToAction = 'input'
    // TODO - isolate to use in others files
    const fieldsToInsertOrUpdate = (): string => {
      const fields = columns.filter(
        (data) => data.camelCaseColumnName !== "id" &&
                    data.camelCaseColumnName !== "createdAt" &&
                    data.camelCaseColumnName !== "updatedAt"
      )

      let template = ''

      for (const column of fields) {
        template += `{name: '${column.columnName}', value: ${variableToAction}.${column.camelCaseColumnName} }, \n`
      }

      return template
    }


    let template = `
        import { ${className}Entity } from "../entities/${className}Entity"
        import { DatabaseConnection } from "../../src/infra/database/database-connection"
        import { GlobalRepositoryInterface } from "../interfaces/repositories/GlobalRepositoryInterface"
        export class ${className}Repository implements GlobalRepositoryInterface<${className}Entity> {
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
          
          async deleteById(id: ${id?.dataTypeTS || 'any'}): Promise<void> {
                await this.connection.delete({
                    table: this.tableName,
                    where: [{
                        name: 'id',
                        value: id
                    }]
                })
            }
                
              async findById(id: ${id?.dataTypeTS || 'any'}): Promise<${className}Entity[]> {
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
                    
            async insert(${variableToAction}: Partial<${className}Entity>):Promise<Partial<${className}Entity[]>> {
                    return await this.connection.insert({
                        fields:\n[`

    template += fieldsToInsertOrUpdate()

    template += ` ], table: this.tableName,
                        retuning: {
                            name: 'id'
                        }
                    })
            }
                    
            
            async update(${variableToAction}: Partial<${className}Entity>): Promise<void> {
                await this.connection.update({
                    fields: \n[`
    template += fieldsToInsertOrUpdate()

    template += `], table: this.tableName,
                    where: [{
                        name: 'id',
                        value: ${variableToAction}.id
                    }]
                })
            }`

    template += '}'
    return template
  }
}