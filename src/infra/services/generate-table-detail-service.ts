import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto"
import { InformationSchemaTableColumnDTO } from "../../domain/dto"
import { TableDetailDTO } from "../../domain/dto/table-detail/table-detail-dto"
import { InformationSchemaRepository } from "../repositories"
import { StringUtil } from "../util/string-util"

export class GenerateTableDetailService {
  private _informationSchemaRepository: InformationSchemaRepository
  constructor(
    informationSchemaRepository: InformationSchemaRepository
  ) {
    this._informationSchemaRepository = informationSchemaRepository
  }

  // TODO criar Postgres Table Adapter
  async createTableDetailBySchemaDetail(schemaName: string, tableName: string): Promise<TableDetailDTO> {
    const columns: InformationSchemaTableColumnDTO[] = await this._informationSchemaRepository.findColumnsByNames(tableName, schemaName)
    const postgresColumns: PostgresColumnDTO[] = []

    for (const column of columns) {
      postgresColumns.push({
        camelCaseColumnName: StringUtil.toCamelCase(column.columnName),
        columnDefault: column.columnDefault,
        columnName: column.columnName,
        dataType: column.dataType,
        isNullable: column.isNullable,
        dataTypeTS: StringUtil.getTsType(column.dataType)
      })
    }

    const className = StringUtil.capitalizeFirstLetter(
      StringUtil.toCamelCase(tableName)
    )
    const tableDetail: TableDetailDTO = {
      tableName,
      columns: postgresColumns,
      className,
      tsTypes: StringUtil.removeQuotesAndCommas(
        StringUtil.convertPostgresColumnsToTsTypes(columns)
      ),
      DTOTemplate: this.createDTOTemplateByColumns(className, postgresColumns),
      EntityTemplate: this.createEntityTemplateByColumns(className, postgresColumns)
    }

    return tableDetail
  }

  // TODO criar DTO Template
  private createDTOTemplateByColumns(className: string, columns: PostgresColumnDTO[]): string {
    let template = `
      export interface ${className}DTO 
      {
      `
    for (const column of columns) {

      template += `${column.camelCaseColumnName}: ${column.dataTypeTS} \n`
    }

    template += '}'
    return template
  }

  // TODO criar Entity Template
  private createEntityTemplateByColumns(className: string, columns: PostgresColumnDTO[]): string {
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