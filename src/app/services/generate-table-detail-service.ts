import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto"
import { InformationSchemaTableColumnDTO } from "../../domain/dto"
import { CRUDUsecaseDTO, TableDetailDTO } from "../../domain/dto/table-detail/table-detail-dto"
import { InformationSchemaRepository } from "../../infra/repositories"
import { DTOTemplate } from "../../infra/templates/dto-template"
import { EntityTemplate } from "../../infra/templates/entity-template"
import { EntityTestTemplate } from "../../infra/templates/entity-test-template"
import { GlobalRepositoryInterfaceTemplate } from "../../infra/templates/global-repository-interface-template"
import { MockEntityTemplate } from "../../infra/templates/mock-entity-template"
import { MockRepositoryTemplate } from "../../infra/templates/mock-repository-template"
import { RepositoryTemplate } from "../../infra/templates/repository-template"
import { RepositoryTestTemplate } from "../../infra/templates/repository-test-template"
import { CreateUseCaseTemplate } from "../../infra/templates/usecases/classes/create-usecase-template"
import { DeleteUseCaseTemplate } from "../../infra/templates/usecases/classes/delete-usecase-template"
import { FindByIdUseCaseTemplate } from "../../infra/templates/usecases/classes/find-by-id-usecase-template"
import { ListAllUseCaseTemplate } from "../../infra/templates/usecases/classes/list-all-usecase-template"
import { UpdateUseCaseTemplate } from "../../infra/templates/usecases/classes/update-usecase-template"
import { CreateUseCaseInterfaceTemplate } from "../../infra/templates/usecases/interfaces/create-usecase-interface-template"
import { DeleteUseCaseInterfaceTemplate } from "../../infra/templates/usecases/interfaces/delete-usecase-interface-template"
import { FindByIdUseCaseInterfaceTemplate } from "../../infra/templates/usecases/interfaces/find-by-id-usecase-interface-template"
import { ListAllUseCaseInterfaceTemplate } from "../../infra/templates/usecases/interfaces/list-all-usecase-interface-template"
import { UpdateUseCaseInterfaceTemplate } from "../../infra/templates/usecases/interfaces/update-usecase-interface-template"
import { CreateUseCaseTestTemplate } from "../../infra/templates/usecases/tests/create-usecase-test-template"
import { DeleteUseCaseTestTemplate } from "../../infra/templates/usecases/tests/delete-usecase-test-template"
import { FindByIdUseCaseTestTemplate } from "../../infra/templates/usecases/tests/find-by-id-usecase-test-template"
import { ListAllUseCaseTestTemplate } from "../../infra/templates/usecases/tests/list-all-usecase-test-template"
import { UpdateUseCaseTestTemplate } from "../../infra/templates/usecases/tests/update-usecase-test-template"
import { StringUtil } from "../../infra/util/string-util"

export class GenerateTableDetailService {
  private _informationSchemaRepository: InformationSchemaRepository
  constructor(
    informationSchemaRepository: InformationSchemaRepository
  ) {
    this._informationSchemaRepository = informationSchemaRepository
  }

  async createTableDetailBySchemaDetail(schemaName: string, tableName: string, columnsOfSystem?:InformationSchemaTableColumnDTO[] ): Promise<TableDetailDTO> {
    let columns: InformationSchemaTableColumnDTO[] 
    
    if(columnsOfSystem) {
      columns = columnsOfSystem
    } else {
      columns = await this._informationSchemaRepository.findColumnsByNames(schemaName, tableName)
    }
    
    
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
      FindByIdUseCaseInterfaceTemplate: FindByIdUseCaseInterfaceTemplate.render(className, postgresColumns),
      FindByIdUseCaseTemplate: FindByIdUseCaseTemplate.render(className, postgresColumns),
      DeleteUseCaseInterfaceTemplate: DeleteUseCaseInterfaceTemplate.render(className, postgresColumns),
      DeleteUseCaseTemplate: DeleteUseCaseTemplate.render(className, postgresColumns),
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