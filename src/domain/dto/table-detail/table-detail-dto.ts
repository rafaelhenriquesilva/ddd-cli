import { PostgresColumnDTO } from "../../@shared/dto/postgres-column-dto"

export interface TableDetailDTO {
    tableName: string
    columns: PostgresColumnDTO[]
    tsTypes: string
    className: string
    MockEntityTemplate: string
    DTOTemplate: string
    EntityTemplate: string
    EntityTestTemplate: string
    GlobalRepositoryInterfaceTemplate: string
    RepositoryTemplate: string
    RepositoryTestTemplate: string
    UseCaseDetail?: CRUDUsecaseDTO
}

export interface CRUDUsecaseDTO {
    ListAllInterfaceTemplate: string
    ListAllTemplate: string
    FindByIdInterfaceTemplate: string
    FindByIdTemplate: string
    DeleteInterfaceTemplate: string
    DeleteTemplate: string
    CreateInterfaceTemplate: string
    CreateTemplate: string
    UpdateInterfaceTemplate: string
    UpdateTemplate: string
}