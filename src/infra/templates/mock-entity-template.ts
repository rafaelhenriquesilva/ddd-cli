import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto"
import { PostgresStringConverter } from "../converters/postgres-string-converter"

export class MockEntityTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    let template = `
         import { faker } from '@faker-js/faker' \n
         import { ${className}Entity } from "../../../../entities/${className}Entity"\n`
    template += this.createMockEntity(columns, className)

    return template
  }

  static createMockEntity(columns: PostgresColumnDTO[], className: string): string {
    let mockEntityTemplate = `
export const create${className}Mock = () => {
  return new ${className}Entity({`


    for (const column of columns) {
      mockEntityTemplate += `${column.camelCaseColumnName}: ${PostgresStringConverter.getMockByTsType(column)}, \n`
    }

    mockEntityTemplate += ` 
  }) 
}
`

    return mockEntityTemplate
  }

}