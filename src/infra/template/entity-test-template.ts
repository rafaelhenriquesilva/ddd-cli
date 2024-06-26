import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto"

export class EntityTestTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    let template = `
         import { faker } from '@faker-js/faker' \n
         import { ${className}Entity } from '../entity/${className}Entity'\n
         const createEntity = () => {
            return new ${className}Entity({`

    for (const column of columns) {
      template += `${column.camelCaseColumnName}: ${this.getMockByTsType(column.dataTypeTS)}, \n`
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

  static getMockByTsType(type: string): string {
    const MockByTsType: any = {
      'number': 'faker.number.float()',
      'string': 'faker.string.sample()',
      'Buffer': 'new Buffer(faker.string.sample())',
      'any': '{}',
      'date': 'new Date()',
      'boolean': 'false'
    }

    return MockByTsType[type] || '{}'
  }

}