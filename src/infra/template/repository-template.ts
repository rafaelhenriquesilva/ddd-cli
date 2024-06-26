import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto"

export class RepositoryTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    let template = `
        import { ${className}Entity } from "../entities/${className}Entity"
        import { DatabaseConnection } from "../src/infra/database/database-connection"
        export class ${className}Repository {
            connection: DatabaseConnection
            tableName: string

            constructor() {
                this.connection = DatabaseConnection.getInstance()
                this.tableName = '${columns && columns.length > 0 ? columns[0].schema : 'x'}.${columns && columns.length > 0 ? columns[0].table : 'y'}'
            }

        }
          `
    // for (const column of columns) {
    
    //   template += `${column.camelCaseColumnName}: ${column.dataTypeTS} \n`
    // }
    
    //template += '}'
    return template
  }
}