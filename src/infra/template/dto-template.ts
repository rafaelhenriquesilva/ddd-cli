import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto"

export class DTOTemplate {
    static render(className: string, columns: PostgresColumnDTO[]): string {
        let template = `
          export interface ${className}DTO 
          {
          `
        for (const column of columns) {
    
          template += `${column.camelCaseColumnName}: ${column.dataTypeTS} \n`
        }
    
        template += '}'
        return template
      }
}