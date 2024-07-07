import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"


export class CreateUseCaseTestTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    const columnsToCreate = columns.filter(column => column.columnDefault === null)
    let template = `
            import { Create${className}UseCase } from "../../../../usecases/${className}/Create${className}UseCase"
            import { create${className}Mock } from "../../mock-entities/${className}/${className}-mock"
            import { repositoryMock } from "../../mock-repositories/repository-mock"

            describe('Create${className}UseCase', () => {
                let usecase: Create${className}UseCase

                beforeEach(() => {
                    usecase = new Create${className}UseCase(repositoryMock)
                })
                it('Create${className}UseCase handle', async () => {
                    const mock = create${className}Mock()
                    await usecase.handle({ \n `
    for (const column of columnsToCreate) {
      template += `${column.camelCaseColumnName}: mock.${column.camelCaseColumnName}, \n`
    }

    template += `\n})

                    expect(repositoryMock.insert).toHaveBeenCalledTimes(1)
                })
            })`
    return template
  }
}

