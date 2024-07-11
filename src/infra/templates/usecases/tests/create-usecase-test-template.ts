import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"
import { TemplateUtil } from "../../../util/template-util"


export class CreateUseCaseTestTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    let template = `
            import { Create${className}UseCase } from "../../../../usecases/${className}/Create${className}Usecase"
            import { create${className}Mock } from "../../mock-entities/${className}/${className}-mock"
            import { repositoryMock } from "../../mock-repositories/repository-mock"

            describe('Create${className}UseCase', () => {
                let usecase: Create${className}UseCase

                beforeEach(() => {
                    usecase = new Create${className}UseCase(repositoryMock)
                })`
    template += this.createHandleTestTemplate(className, columns)
    template += `\n})`
    return template
  }

  static createHandleTestTemplate(className: string, columns: PostgresColumnDTO[]): string {
    const fieldsToUpsert = TemplateUtil.filterColumnsToUpsert(columns)
    let handleTestTemplate = `
 it('Create${className}UseCase handle', async () => {
    const mock = create${className}Mock()
    await usecase.handle({ \n `
    for (const column of fieldsToUpsert) {
      handleTestTemplate += `${column.camelCaseColumnName}: mock.${column.camelCaseColumnName}, \n`
    }

    handleTestTemplate += `
    })
  expect(repositoryMock.insert).toHaveBeenCalledTimes(1)
})
    `

    return handleTestTemplate
  }
}

