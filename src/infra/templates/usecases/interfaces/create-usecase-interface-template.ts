import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"
import { TemplateUtil } from "../../../util/template-util"


export class CreateUseCaseInterfaceTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    
    let template = `
          export interface ICreate${className}UseCase {
              handle(input: inputCreate${className}): Promise<void>
          }`
    template+= this.createInputUseCase(className,columns)

       
    return template
  }

  static createInputUseCase(className: string, columns: PostgresColumnDTO[]): string {
    const fieldsToUpsert = TemplateUtil.filterColumnsToUpsert(columns)
    let createUseCaseInputTemplate = `\n export interface inputCreate${className} { \n` 
    for (const column of fieldsToUpsert) {

      createUseCaseInputTemplate += `${column.camelCaseColumnName}: ${column.dataTypeTS} \n`
    }

    createUseCaseInputTemplate += '\n}'

    return createUseCaseInputTemplate
  }
}

