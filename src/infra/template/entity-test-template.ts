import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto"
import { PostgresStringConverter } from "../converters/postgres-string-converter"

export class EntityTestTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    let template = `
         import { faker } from '@faker-js/faker' \n
         import { ${className}Entity } from '../../../entities/${className}Entity'\n
         const createEntity = () => {
            return new ${className}Entity({`

    for (const column of columns) {
      template += `${column.camelCaseColumnName}: ${PostgresStringConverter.getMockByTsType(column)}, \n`
    }

    template += ` }) 
            }
         
            
            describe('Generate a Entity ${className}', () => {
               it('should be entity values', async () => {
                  const entity = createEntity()
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