import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto";
import { InformationSchemaTableColumnDTO } from "../../domain/dto";
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
    async createTableDetailBySchemaDetail(schemaName:string, tableName: string): Promise<TableDetailDTO> {
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
            DTOTemplate: this.createDTOTemplateByColumns(className, columns)
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
}