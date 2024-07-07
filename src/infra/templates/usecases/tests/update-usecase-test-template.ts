import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"


export class UpdateUseCaseTestTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    const columnsToCreate = columns.filter(column => column.columnDefault === null)
    const idColumn = columns.find(column => column.columnName === 'id')
    let template = `
            import { Update${className}UseCase } from "../../../../usecases/${className}/Update${className}UseCase"
            import { create${className}Mock } from "../../mock-entities/${className}/${className}-mock"
            import { repositoryMock } from "../../mock-repositories/repository-mock"

            describe('Update${className}UseCase', () => {
                let usecase: Update${className}UseCase

                beforeEach(() => {
                    usecase = new Update${className}UseCase(repositoryMock)
                })
                it('Update${className}UseCase handle', async () => {
                    const mock = create${className}Mock()
                    await usecase.handle({\n `
    if (idColumn) {
      template += `${idColumn.camelCaseColumnName}: mock.${idColumn.camelCaseColumnName}, \n`
    }
    for (const column of columnsToCreate) {
      template += `${column.camelCaseColumnName}: mock.${column.camelCaseColumnName}, \n`
    }

    template += `\n})

                    expect(repositoryMock.update).toHaveBeenCalledTimes(1)
                })
            })`
    return template
  }
}

