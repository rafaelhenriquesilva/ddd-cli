import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"
import { TemplateUtil } from "../../../util/template-util"

export class CreateUseCaseTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    const columnsToCreate = columns.filter(column => column.columnDefault === null)
    let template = `
        import {GlobalRepositoryInterface} from '../../interfaces/repositories/GlobalRepositoryInterface'
        import { ${className}Entity } from "../../entities/${className}Entity";
        import { ICreate${className}UseCase, inputCreate${className} } from "../../interfaces/usecases/${className}/ICreate${className}Usecase";

        export class Create${className}UseCase implements ICreate${className}UseCase {
            private repository: GlobalRepositoryInterface<${className}Entity>

            constructor(
                repository: GlobalRepositoryInterface<${className}Entity>
            ) {
                this.repository = repository
            }`
            template += this.createHandleMethod(className, columns)
    template += `\n }`
    return template
  }

  static createHandleMethod(className: string, columns: PostgresColumnDTO[]): string {
    const fieldsToUpsert = TemplateUtil.filterColumnsToUpsert(columns)
    let createHandleUseCaseTemplate = ` 
async handle(input: inputCreate${className}): Promise<void> {
  await this.repository.insert({\n`

    for (const column of fieldsToUpsert) {

      createHandleUseCaseTemplate += `${column.camelCaseColumnName}: input.${column.camelCaseColumnName}, \n`
    }

    createHandleUseCaseTemplate += `
  })
}`
    return createHandleUseCaseTemplate
  }
}

