import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto"

export class EntityTemplate {
  static render(className: string, columns: PostgresColumnDTO[]): string {
    let template = `
        import { ${className}DTO } from '../dto/${className}DTO'
          export class ${className}Entity 
        {
        
        `
    template += EntityTemplate.addingColumnsAndTypes(columns)

    template += `\n constructor(dto: ${className}DTO) {`

    template += this.populateEntityWithDto(columns)
    template += `}\n`

    template += this.createGettersToColumns(columns)
    template += this.createObjectReturn(columns, className)

    template += '}'
    return template
  }

  static addingColumnsAndTypes(columns: PostgresColumnDTO[]): string {
    let fieldsTemplate = ''
    for (const column of columns) {
      fieldsTemplate += `private readonly _${column.camelCaseColumnName}: ${column.dataTypeTS} \n`
    }
    return fieldsTemplate
  }

  static populateEntityWithDto(columns: PostgresColumnDTO[]): string {
    let populateConstructorTemplate = ''
    for (const column of columns) {

      populateConstructorTemplate += `this._${column.camelCaseColumnName} = dto.${column.camelCaseColumnName} \n`
    }
    return populateConstructorTemplate
  }

  static createGettersToColumns(columns: PostgresColumnDTO[]) {
    let getTemplate = ''
    for (const column of columns) {

      getTemplate += `
               public get ${column.camelCaseColumnName}(): ${column.dataTypeTS} {
                      return this._${column.camelCaseColumnName}
              } \n`
    }
    return getTemplate
  }

  static createObjectReturn(columns: PostgresColumnDTO[], className: string): string {
    let finishTemplate = ''
    finishTemplate += `toJson(): ${className}DTO {\n`
    finishTemplate += `return {\n`
    for (const column of columns) {
      finishTemplate += `${column.camelCaseColumnName}: this.${column.camelCaseColumnName}, \n`
    }
    finishTemplate += `}\n`
    finishTemplate += `}\n`

    return finishTemplate
  }
}