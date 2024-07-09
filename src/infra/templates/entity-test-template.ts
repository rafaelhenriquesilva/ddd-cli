import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto"

export class EntityTestTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    let template = `
         import { create${className}Mock } from "../mock-entities/${className}/${className}-mock"
            
            describe('Generate a Entity ${className}', () => {
               it('should be entity values', async () => {
                  const entity = create${className}Mock()\n`
    template += this.validateJSONTemplate(columns)
    template += `
               })
            })`



    return template
  }

  static validateJSONTemplate(columns: PostgresColumnDTO[]): string {
    let JSONTemplate = `expect(entity.toJson()).toEqual({\n`
    for (const column of columns) {
      JSONTemplate += `${column.camelCaseColumnName}: entity.${column.camelCaseColumnName}, \n`
    }
    JSONTemplate += `\n})`
    return JSONTemplate
  }

}
