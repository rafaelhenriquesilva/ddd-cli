import { PostgresColumnDTO } from "../../@shared/dto/postgres-column-dto"

export interface InformationSchemaTableDTO {
    tableName: string
}

export interface InformationSchemaTableColumnDTO extends PostgresColumnDTO {}