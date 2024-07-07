import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto"
import { InformationSchemaTableColumnDTO } from "../../domain/dto"
import { CRUDUsecaseDTO, TableDetailDTO } from "../../domain/dto/table-detail/table-detail-dto"
import { InformationSchemaRepository } from "../repositories"
import { DTOTemplate } from "../templates/dto-template"
import { EntityTemplate } from "../templates/entity-template"
import { EntityTestTemplate } from "../templates/entity-test-template"
import { GlobalRepositoryInterfaceTemplate } from "../templates/global-repository-interface-template"
import { MockEntityTemplate } from "../templates/mock-entity-template"
import { MockRepositoryTemplate } from "../templates/mock-repository-template"
import { RepositoryTemplate } from "../templates/repository-template"
import { RepositoryTestTemplate } from "../templates/repository-test-template"
import { CreateUseCaseTemplate } from "../templates/usecases/classes/create-usecase-template"
import { DeleteUseCaseTemplate } from "../templates/usecases/classes/delete-usecase-template"
import { FindByIdUseCaseTemplate } from "../templates/usecases/classes/find-by-id-usecase-template"
import { ListAllUseCaseTemplate } from "../templates/usecases/classes/list-all-usecase-template"
import { UpdateUseCaseTemplate } from "../templates/usecases/classes/update-usecase-template"
import { CreateUseCaseInterfaceTemplate } from "../templates/usecases/interfaces/create-usecase-interface-template"
import { DeleteUseCaseInterfaceTemplate } from "../templates/usecases/interfaces/delete-usecase-interface-template"
import { FindByIdUseCaseInterfaceTemplate } from "../templates/usecases/interfaces/find-by-id-usecase-interface-template"
import { ListAllUseCaseInterfaceTemplate } from "../templates/usecases/interfaces/list-all-usecase-interface-template"
import { UpdateUseCaseInterfaceTemplate } from "../templates/usecases/interfaces/update-usecase-interface-template"
import { CreateUseCaseTestTemplate } from "../templates/usecases/tests/create-usecase-test-template"
import { DeleteUseCaseTestTemplate } from "../templates/usecases/tests/delete-usecase-test-template"
import { FindByIdUseCaseTestTemplate } from "../templates/usecases/tests/find-by-id-usecase-test-template"
import { ListAllUseCaseTestTemplate } from "../templates/usecases/tests/list-all-usecase-test-template"
import { UpdateUseCaseTestTemplate } from "../templates/usecases/tests/update-usecase-test-template"
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
      RepositoryTemplate: RepositoryTemplate.render(className, postgresColumns),
      RepositoryTestTemplate: RepositoryTestTemplate.render(className, postgresColumns),
      GlobalRepositoryInterfaceTemplate: GlobalRepositoryInterfaceTemplate.render(),
      MockRepositoryTemplate: MockRepositoryTemplate.render(),
      UseCaseDetail: this.createUseCaseDetail(className, postgresColumns)
    }

    return tableDetail
  }

  createUseCaseDetail(className: string, postgresColumns: PostgresColumnDTO[]): CRUDUsecaseDTO {
    return {
      ListAllUseCaseInterfaceTemplate: ListAllUseCaseInterfaceTemplate.render(className),
      ListAllUseCaseTemplate: ListAllUseCaseTemplate.render(className),
      FindByIdUseCaseInterfaceTemplate: FindByIdUseCaseInterfaceTemplate.render(className),
      FindByIdUseCaseTemplate: FindByIdUseCaseTemplate.render(className),
      DeleteUseCaseInterfaceTemplate: DeleteUseCaseInterfaceTemplate.render(className),
      DeleteUseCaseTemplate: DeleteUseCaseTemplate.render(className),
      CreateUseCaseInterfaceTemplate: CreateUseCaseInterfaceTemplate.render(className, postgresColumns),
      CreateUseCaseTemplate: CreateUseCaseTemplate.render(className, postgresColumns),
      UpdateUseCaseInterfaceTemplate: UpdateUseCaseInterfaceTemplate.render(className, postgresColumns),
      UpdateUseCaseTemplate: UpdateUseCaseTemplate.render(className, postgresColumns),
      ListAllUseCaseTestTemplate: ListAllUseCaseTestTemplate.render(className),
      FindByIdUseCaseTestTemplate: FindByIdUseCaseTestTemplate.render(className),
      DeleteUseCaseTestTemplate: DeleteUseCaseTestTemplate.render(className),
      CreateUseCaseTestTemplate: CreateUseCaseTestTemplate.render(className, postgresColumns),
      UpdateUseCaseTestTemplate: UpdateUseCaseTestTemplate.render(className, postgresColumns),
    }
  }


}