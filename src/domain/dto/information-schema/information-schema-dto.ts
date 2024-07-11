import { PostgresColumnDTO } from "../../@shared/dto/postgres-column-dto"

export interface InformationSchemaTableDTO {
    tableName: string
}

export interface InformationSchemaTableColumnDTO 
extends Omit<PostgresColumnDTO, 'camelCaseColumnName' | 'dataTypeTS' | 'schema' | 'table'> {
    tableName:string
    schemaName:string
}