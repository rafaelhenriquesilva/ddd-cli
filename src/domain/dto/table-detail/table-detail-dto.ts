import { PostgresColumnDTO } from "../../@shared/dto/postgres-column-dto"

export interface TableDetailDTO {
    tableName: string
    columns: PostgresColumnDTO[]
    tsTypes: string
    className: string
    MockEntityTemplate: string
    MockRepositoryTemplate: string
    DTOTemplate: string
    EntityTemplate: string
    EntityTestTemplate: string
    GlobalRepositoryInterfaceTemplate: string
    RepositoryTemplate: string
    RepositoryTestTemplate: string
    UseCaseDetail: CRUDUsecaseDTO
}

export interface CRUDUsecaseDTO {
    ListAllUseCaseInterfaceTemplate: string
    ListAllUseCaseTemplate: string
    FindByIdUseCaseInterfaceTemplate: string
    FindByIdUseCaseTemplate: string
    DeleteUseCaseInterfaceTemplate: string
    DeleteUseCaseTemplate: string
    CreateUseCaseInterfaceTemplate: string
    CreateUseCaseTemplate: string
    UpdateUseCaseInterfaceTemplate: string
    UpdateUseCaseTemplate: string
}