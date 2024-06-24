import { InformationSchemaTableColumnDTO } from "../information-schema/information-schema-dto"

export interface TableDetailDTO {
    tableName: string
    columns: InformationSchemaTableColumnDTO[]
    tsTypes: string
    className: string
    DTOTemplate: string
}