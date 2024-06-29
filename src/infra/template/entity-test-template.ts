import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto"

export class EntityTestTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    let template = `
         import { faker } from '@faker-js/faker' \n
         import { ${className}Entity } from '../entities/${className}Entity'\n
         const createEntity = () => {
            return new ${className}Entity({`

    for (const column of columns) {
      template += `${column.camelCaseColumnName}: ${this.getMockByTsType(column)}, \n`
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
  /**
   * TODO
   * Criar um postgree string
   * Usar o data type postgree para o mock
   */
  static getMockByTsType(column: PostgresColumnDTO): string {
    const MockByTsType: any = {
      'number': 'faker.number.float()',
      'string': 'faker.string.sample()',
      'Buffer': 'new Buffer(faker.string.sample())',
      'any': '{}',
      'Date': 'new Date()',
      'boolean': 'false'
    }

    if(column.dataType === 'uuid') return 'faker.string.uuid()'

    return MockByTsType[column.dataTypeTS] || '{}'
  }

}