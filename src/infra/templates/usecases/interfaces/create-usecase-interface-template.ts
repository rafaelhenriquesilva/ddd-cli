import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"


export class CreateUseCaseInterfaceTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    const columnsToCreate = columns.filter(column => column.columnDefault === null)
    let template = `
          export interface ICreate${className}UseCase {
              handle(input: inputCreate${className}): Promise<void>
          }

        export interface inputCreate${className} { \n `
    for (const column of columnsToCreate) {

      template += `${column.camelCaseColumnName}: ${column.dataTypeTS} \n`
    }

    template += '\n}'
    return template
  }
}

