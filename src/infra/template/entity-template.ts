import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto"

export class EntityTemplate {
    static render(className: string, columns: PostgresColumnDTO[]): string {
        let template = `
        import { ${className}DTO } from '../dto/${className}DTO'
          export class ${className}Entity 
        {
        
        `
        for (const column of columns) {

            template += `private readonly _${column.camelCaseColumnName}: ${column.dataTypeTS} \n`
        }

        template += `\n constructor(dto: ${className}DTO) {`
        for (const column of columns) {

            template += `this._${column.camelCaseColumnName} = dto.${column.camelCaseColumnName} \n`
        }
        template += `}\n`


        for (const column of columns) {

            template += `
               public get ${column.camelCaseColumnName}(): ${column.dataTypeTS} {
                      return this._${column.camelCaseColumnName}
              } \n`
        }
        // public set ${camelCaseColumnName}(value: ${dataTypeTS}) {
        //     this._${camelCaseColumnName} = value
        // }\n

        template += `toJson(): ${className}DTO {\n`
        template += `return {\n`
        for (const column of columns) {

            template += `${column.camelCaseColumnName}: this.${column.camelCaseColumnName}, \n`
        }
        template += `}\n`
        template += `}\n`

        template += '}'
        return template
    }
}