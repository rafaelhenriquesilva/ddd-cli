import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto"

export class EntityTestTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    let template = `
         import { create${className}Mock } from "../mock-entities/${className}/${className}-mock"
            
            describe('Generate a Entity ${className}', () => {
               it('should be entity values', async () => {
                  const entity = create${className}Mock()
                  expect(entity.toJson()).toEqual({\n`

    for (const column of columns) {
      template += `${column.camelCaseColumnName}: entity.${column.camelCaseColumnName}, \n`
    }

    template += `})
               })
            })`



    return template
  }

}
