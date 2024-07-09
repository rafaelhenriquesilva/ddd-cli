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
        export class ${className}Repository implements GlobalRepositoryInterface<${className}Entity> {`

    template += this.initializeAttributesRepository(columns)
    template += this.makeListAlltemplate(className)
    template += this.makeMappperTemplate(columns, variableMapperName, className)
    template += this.makeDeleteTemplate(id)
    template += this.makeFindByIdTemplate(className, id)
    template += `  
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

  static initializeAttributesRepository(columns: PostgresColumnDTO[]): string {
    let initTemplate = `
     connection: DatabaseConnection
            tableName: string

            constructor() {
                this.connection = DatabaseConnection.getInstance()
                this.tableName = '${columns && columns.length > 0 ? columns[0].schema : 'x'}.${columns && columns.length > 0 ? columns[0].table : 'y'}'
            }

    `

    return initTemplate
  }

  static makeListAlltemplate(className: string): string {
    let listAllTemplate = `
    async listAll(): Promise<${className}Entity[]> {
                const SchemaModel = await this.connection.find({
                table: this.tableName,
                fields: [
                    { name: '*' }
                ]
                })

                return SchemaModel.map((row: any) => this.mapRowToEntity(row))

            }
    `

    return listAllTemplate
  }

  static makeMappperTemplate(columns: PostgresColumnDTO[], variableMapperName: string, className: string): string {
    let mapRowToEntityTemplate = `
  private mapRowToEntity(${variableMapperName}: any) {
    return new ${className}Entity({\n`

    for (const column of columns) {
      mapRowToEntityTemplate += `${column.camelCaseColumnName}: ${variableMapperName}.${column.columnName}, \n`
    }

    mapRowToEntityTemplate += `  
  })
}`

    return mapRowToEntityTemplate
  }

  static makeDeleteTemplate(column?: PostgresColumnDTO) {
    return `
      async deleteById(id: ${column?.dataTypeTS || 'any'}): Promise<void> {
                await this.connection.delete({
                    table: this.tableName,
                    where: [{
                        name: 'id',
                        value: id
                    }]
                })
            }
    `
  }

  static makeFindByIdTemplate(className: string, column?: PostgresColumnDTO): string {
    return `
      async findById(id: ${column?.dataTypeTS || 'any'}): Promise<${className}Entity[]> {
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
    `
  }
}