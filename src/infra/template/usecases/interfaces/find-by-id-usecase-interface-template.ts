import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"

export class FindByIdUseCaseInterfaceTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    let template = `
            import { ${className}Entity } from "../../../entities/${className}Entity";

            export interface IFindById${className}UseCase {
                handle(id: string): Promise<DeveloperEntity | undefined>
            }

          `
    return template
  }
}