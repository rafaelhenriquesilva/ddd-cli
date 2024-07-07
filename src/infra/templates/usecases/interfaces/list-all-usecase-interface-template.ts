import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"

export class ListAllUseCaseInterfaceTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    let template = `
            import { ${className}Entity } from "../../../entities/${className}Entity";

            export interface IListAll${className}UseCase {
                handle(): Promise<${className}Entity[]>
            }

          `
    return template
  }
}