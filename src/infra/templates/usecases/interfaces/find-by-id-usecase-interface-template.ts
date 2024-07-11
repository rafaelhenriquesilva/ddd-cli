import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"
import { TemplateUtil } from "../../../util/template-util"

export class FindByIdUseCaseInterfaceTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    const idColumn = TemplateUtil.findIdColumn(columns)
    const typeColumn = idColumn ? idColumn.dataTypeTS : 'any'
    const template = `
            import { ${className}Entity } from "../../../entities/${className}Entity";

            export interface IFindById${className}UseCase {
                handle(id: ${typeColumn}): Promise<${className}Entity | undefined>
            }

          `
    return template
  }
}