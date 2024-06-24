import { PostgresColumnDTO } from "../../@shared/dto/postgres-column-dto"

export interface TableDetailDTO {
    tableName: string
    columns: PostgresColumnDTO[]
    tsTypes: string
    className: string
    DTOTemplate: string
    EntityTemplate: string
}