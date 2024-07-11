import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"
import { TemplateUtil } from "../../../util/template-util"

export class DeleteUseCaseInterfaceTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
     const idColumn = TemplateUtil.findIdColumn(columns)
    const typeColumn = idColumn ? idColumn.dataTypeTS : 'any'
    const template = `
            export interface IDelete${className}UseCase {
                handle(id: ${typeColumn}): Promise<void>
            }

          `
    return template
  }
}