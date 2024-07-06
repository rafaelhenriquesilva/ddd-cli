import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"

export class DeleteUseCaseInterfaceTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    let template = `
            export interface IDelete${className}UseCase {
                handle(id: string): Promise<void>
            }

          `
    return template
  }
}