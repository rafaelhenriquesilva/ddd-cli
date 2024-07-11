import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"
import { TemplateUtil } from "../../../util/template-util"


export class UpdateUseCaseInterfaceTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    let template = `
          export interface IUpdate${className}UseCase {
              handle(input: inputUpdate${className}): Promise<void>
          }`
    
          template += this.createInputUseCase(className, columns)

    return template
  }

  static createInputUseCase(className: string, columns: PostgresColumnDTO[]): string {
    const fieldsToUpsert = TemplateUtil.filterColumnsToUpsert(columns)
    const idColumn = TemplateUtil.findIdColumn(columns)
    let createUseCaseInputTemplate = `\n export interface inputUpdate${className} { \n` 
    if (idColumn) {
      createUseCaseInputTemplate += `${idColumn.camelCaseColumnName}: ${idColumn.dataTypeTS} \n`
    }
    for (const column of fieldsToUpsert) {

      createUseCaseInputTemplate += `${column.camelCaseColumnName}: ${column.dataTypeTS} \n`
    }

    createUseCaseInputTemplate += '\n}'

    return createUseCaseInputTemplate
  }
}

