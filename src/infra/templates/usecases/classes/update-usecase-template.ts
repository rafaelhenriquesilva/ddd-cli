import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"
import { TemplateUtil } from "../../../util/template-util"

export class UpdateUseCaseTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    let template = `
        import {GlobalRepositoryInterface} from '../../interfaces/repositories/GlobalRepositoryInterface'
        import { ${className}Entity } from "../../entities/${className}Entity";
        import { inputUpdate${className}, IUpdate${className}UseCase } from "../../interfaces/usecases/${className}/IUpdate${className}Usecase";

        export class Update${className}UseCase implements IUpdate${className}UseCase {
            private repository: GlobalRepositoryInterface<${className}Entity>

            constructor(
                repository: GlobalRepositoryInterface<${className}Entity>
            ) {
                this.repository = repository
            }`
    template += this.createHandleMethod(className, columns)
    template += `}`
    return template
  }

  static createHandleMethod(className: string, columns: PostgresColumnDTO[]): string {
    const fieldsToUpsert = TemplateUtil.filterColumnsToUpsert(columns)
    const idColumn = TemplateUtil.findIdColumn(columns)
    let handleTemplate = `async handle(input: inputUpdate${className}): Promise<void> {
      await this.repository.update({\n`
    if (idColumn) {
      handleTemplate += `${idColumn.camelCaseColumnName}: input.${idColumn.camelCaseColumnName}, \n`
    }
    for (const column of fieldsToUpsert) {

      handleTemplate += `${column.camelCaseColumnName}: input.${column.camelCaseColumnName}, \n`
    }

    handleTemplate += `
  })
}`
    return handleTemplate
  }
}

