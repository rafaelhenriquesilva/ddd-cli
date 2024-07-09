import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto"

export class DTOTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    let template = `export interface ${className}DTO 
{`
    
    template += DTOTemplate.addingColumnsAndTypes(columns)

    template += '}'
    return template
  }

  static addingColumnsAndTypes(columns: PostgresColumnDTO[]): string {
    let fieldsTemplate = ''
    for (const column of columns) {
      fieldsTemplate += `${column.camelCaseColumnName}: ${column.dataTypeTS} \n`
    }
    return fieldsTemplate
  }
}