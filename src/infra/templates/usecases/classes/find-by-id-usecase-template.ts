import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"
import { TemplateUtil } from "../../../util/template-util"

export class FindByIdUseCaseTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    const idColumn = TemplateUtil.findIdColumn(columns)
    const typeColumn = idColumn ? idColumn.dataTypeTS : 'any'
    let template = `
                import {GlobalRepositoryInterface} from '../../interfaces/repositories/GlobalRepositoryInterface'
                import { ${className}Entity } from "../../entities/${className}Entity";
                import { IFindById${className}UseCase } from "../../interfaces/usecases/${className}/IFindById${className}UseCase";

                export class FindById${className}UseCase implements IFindById${className}UseCase {
                    private repository: GlobalRepositoryInterface<${className}Entity>

                    constructor(
                        repository: GlobalRepositoryInterface<${className}Entity>
                    ) {
                        this.repository = repository
                    }`
    template += this.createHandleMethod(className,typeColumn)
    template += `} \n`
      

    return template
  }

  static createHandleMethod(className: string, typeColumn: string): string {
    return `
 async handle(id: ${typeColumn}): Promise<${className}Entity | undefined> {
                        const result = await this.repository.findById(id)
                        if (result.length === 0) return undefined
                        return result[0]
                    }
    `
  }
}

