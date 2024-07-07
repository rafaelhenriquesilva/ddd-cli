import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"


export class UpdateUseCaseInterfaceTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    const columnsToUpdate = columns.filter(column => column.columnDefault === null)
    const idColumn = columns.find(column => column.columnName === 'id')
    let template = `
          export interface IUpdate${className}UseCase {
              handle(input: inputUpdate${className}): Promise<void>
          }

        export interface inputUpdate${className} { \n `
    if (idColumn) {
      template += `${idColumn.camelCaseColumnName}: ${idColumn.dataTypeTS} \n`
    }
    for (const column of columnsToUpdate) {

      template += `${column.camelCaseColumnName}: ${column.dataTypeTS} \n`
    }


    template += '\n}'
    return template
  }
}

