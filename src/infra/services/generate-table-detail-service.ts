import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto"
import { InformationSchemaTableColumnDTO } from "../../domain/dto"
import { TableDetailDTO } from "../../domain/dto/table-detail/table-detail-dto"
import { InformationSchemaRepository } from "../repositories"
import { DTOTemplate } from "../template/dto-template"
import { EntityTemplate } from "../template/entity-template"
import { EntityTestTemplate } from "../template/entity-test-template"
import { GlobalRepositoryInterfaceTemplate } from "../template/global-repository-interface-template"
import { MockEntityTemplate } from "../template/mock-entity-template"
import { RepositoryTemplate } from "../template/repository-template"
import { RepositoryTestTemplate } from "../template/repository-test-template"
import { StringUtil } from "../util/string-util"

export class GenerateTableDetailService {
  private _informationSchemaRepository: InformationSchemaRepository
  constructor(
    informationSchemaRepository: InformationSchemaRepository
  ) {
    this._informationSchemaRepository = informationSchemaRepository
  }

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
        dataTypeTS: StringUtil.getTsType(column.dataType),
        schema: schemaName,
        table: tableName
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
      MockEntityTemplate: MockEntityTemplate.render(className, postgresColumns),
      DTOTemplate: DTOTemplate.render(className, postgresColumns),
      EntityTemplate: EntityTemplate.render(className, postgresColumns),
      EntityTestTemplate: EntityTestTemplate.render(className, postgresColumns),
      RepositoryTemplate: RepositoryTemplate.render(className,postgresColumns),
      RepositoryTestTemplate: RepositoryTestTemplate.render(className,postgresColumns),
      GlobalRepositoryInterfaceTemplate: GlobalRepositoryInterfaceTemplate.render()
    }

    return tableDetail
  }

  
}