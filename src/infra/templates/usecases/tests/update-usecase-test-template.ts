import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"
import { TemplateUtil } from "../../../util/template-util"


export class UpdateUseCaseTestTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    let template = `
            import { Update${className}UseCase } from "../../../../usecases/${className}/Update${className}Usecase"
            import { create${className}Mock } from "../../mock-entities/${className}/${className}-mock"
            import { repositoryMock } from "../../mock-repositories/repository-mock"

            describe('Update${className}UseCase', () => {
                let usecase: Update${className}UseCase

                beforeEach(() => {
                    usecase = new Update${className}UseCase(repositoryMock)
                })
                `

    template += this.createHandleTestTemplate(className, columns)
    template += `\n})`
    return template
  }

  static createHandleTestTemplate(className: string, columns: PostgresColumnDTO[]): string {
    const fieldsToUpsert = TemplateUtil.filterColumnsToUpsert(columns)
    const idColumn = TemplateUtil.findIdColumn(columns)
    let handleTestTemplate = `
it('Update${className}UseCase handle', async () => {
  const mock = create${className}Mock()
  await usecase.handle({\n `
    if (idColumn) {
      handleTestTemplate += `${idColumn.camelCaseColumnName}: mock.${idColumn.camelCaseColumnName}, \n`
    }
    for (const column of fieldsToUpsert) {
      handleTestTemplate += `${column.camelCaseColumnName}: mock.${column.camelCaseColumnName}, \n`
    }
    handleTestTemplate += `
    })
   expect(repositoryMock.update).toHaveBeenCalledTimes(1)
})
    `

    return handleTestTemplate
  }
}

