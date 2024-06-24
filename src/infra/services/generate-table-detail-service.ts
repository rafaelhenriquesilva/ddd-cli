import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto";
import { TableDetailDTO } from "../../domain/dto/table-detail/table-detail-dto";
import { InformationSchemaRepository } from "../repositories";
import { StringUtil } from "../util/string-util";

export class GenerateTableDetailService {
    private _informationSchemaRepository: InformationSchemaRepository
    constructor(
        informationSchemaRepository: InformationSchemaRepository
    ) {
        this._informationSchemaRepository = informationSchemaRepository
    }

    // TODO criar Postgres Table Adapter
    async createTableDetailBySchemaDetail(schemaName: string, tableName: string): Promise<TableDetailDTO> {
        const columns: PostgresColumnDTO[] = await this._informationSchemaRepository.findColumnsByNames(tableName, schemaName)
        const className = StringUtil.capitalizeFirstLetter(
            StringUtil.toCamelCase(tableName)
        )
        const tableDetail: TableDetailDTO = {
            tableName,
            columns,
            className,
            tsTypes: StringUtil.removeQuotesAndCommas(
                StringUtil.convertPostgresColumnsToTsTypes(columns)
            ),
            DTOTemplate: this.createDTOTemplateByColumns(className, columns),
            EntityTemplate: this.createEntityTemplateByColumns(className, columns)
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
            const camelCaseColumnName = StringUtil.toCamelCase(column.columnName)
            const dataTypeTS = StringUtil.getTsType(column.dataType)

            template += `${camelCaseColumnName}: ${dataTypeTS} \n`
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
            const camelCaseColumnName = StringUtil.toCamelCase(column.columnName)
            const dataTypeTS = StringUtil.getTsType(column.dataType)

            template += `private readonly _${camelCaseColumnName}: ${dataTypeTS} \n`
        }

        template += `\n constructor(dto: ${className}DTO) {`
        for (const column of columns) {
            const camelCaseColumnName = StringUtil.toCamelCase(column.columnName)

            template += `this._${camelCaseColumnName} = dto.${camelCaseColumnName} \n`
        }
        template += `}\n`


        for (const column of columns) {
            const camelCaseColumnName = StringUtil.toCamelCase(column.columnName)
            const dataTypeTS = StringUtil.getTsType(column.dataType)

            template += `
             public get ${camelCaseColumnName}(): ${dataTypeTS} {
                    return this._${camelCaseColumnName}
            } \n`
        }
        // public set ${camelCaseColumnName}(value: ${dataTypeTS}) {
        //     this._${camelCaseColumnName} = value
        // }\n

        template += `toJson(): ${className}DTO {\n`
        template += `return {\n`
        for (const column of columns) {
            const camelCaseColumnName = StringUtil.toCamelCase(column.columnName)

            template += `${camelCaseColumnName}: this.${camelCaseColumnName}, \n`
        }
        template += `}\n`
        template += `}\n`

        template += '}'
        return template
    }
}