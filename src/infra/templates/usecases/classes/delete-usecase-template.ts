import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"
import { TemplateUtil } from "../../../util/template-util"

export class DeleteUseCaseTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    const idColumn = TemplateUtil.findIdColumn(columns)
    const typeColumn = idColumn ? idColumn.dataTypeTS : 'any'
    let template = `
                import {GlobalRepositoryInterface} from '../../interfaces/repositories/GlobalRepositoryInterface'
                import { ${className}Entity } from "../../entities/${className}Entity";
                import { IDelete${className}UseCase } from "../../interfaces/usecases/${className}/IDelete${className}Usecase";

                export class Delete${className}UseCase implements IDelete${className}UseCase {
                    private repository: GlobalRepositoryInterface<${className}Entity>

                    constructor(
                        repository: GlobalRepositoryInterface<${className}Entity>
                    ) {
                        this.repository = repository
                    }`
                
    template += this.createHandleMethod(typeColumn)
    template += `}\n`
      

    return template
  }

  static createHandleMethod(typeColumn: string): string {
    return `
async handle(id: ${typeColumn}): Promise<void> {
  await this.repository.deleteById(id)
}
    `
  }
}

