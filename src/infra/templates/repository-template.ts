import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto"
import { TemplateUtil } from "../util/template-util"

export class RepositoryTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    const id: any = columns.find(data => data.camelCaseColumnName === 'id') || 'any'
    const variableMapperName = 'row'
    const variableToAction = 'input'


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
    template += this.makeInsertTemplate(columns, variableToAction, className)
    template += this.makeUpdateTemplate(columns, variableToAction, className)

    template += '}'
    return template
  }

  static initializeAttributesRepository(columns: PostgresColumnDTO[]): string {
    const initTemplate = `
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
    const listAllTemplate = `
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

  static makeInsertTemplate(columns: PostgresColumnDTO[], variableToAction: string, className: string): string {
    let insertTemplate = `async insert(${variableToAction}: Partial<${className}Entity>):Promise<Partial<${className}Entity[]>> {
                    return await this.connection.insert({
                        fields:\n[`

    insertTemplate += this.makeUpsertFieldsTemplate(columns, variableToAction)
    insertTemplate += ` ], table: this.tableName,
                        retuning: {
                            name: 'id'
                        }
                    })
            }`
    return insertTemplate

  }

  static makeUpsertFieldsTemplate(columns: PostgresColumnDTO[], variableToAction: string) {
    const fieldsToUpsert = TemplateUtil.filterColumnsToUpsert(columns)
    let columnsUpsertTemplate = ''
    for (const column of fieldsToUpsert) {
      columnsUpsertTemplate += `{name: '${column.columnName}', value: ${variableToAction}.${column.camelCaseColumnName} }, \n`
    }

    return columnsUpsertTemplate
  }


  static makeUpdateTemplate(columns: PostgresColumnDTO[], variableToAction: string, className: string): string {
    let updateTemplate = `async update(${variableToAction}: Partial<${className}Entity>): Promise<void> {
                await this.connection.update({
                    fields: \n[`
    updateTemplate += this.makeUpsertFieldsTemplate(columns, variableToAction)

    updateTemplate += `], table: this.tableName,
                    where: [{
                        name: 'id',
                        value: ${variableToAction}.id
                    }]
                })
            }`
    return updateTemplate
  }
}