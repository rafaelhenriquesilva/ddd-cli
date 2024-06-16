import { InformationSchemaTableColumnDTO, InformationSchemaTableDTO } from "../../../../domain/dto"

export interface InformationSchemaRepositoryInterface {
    findTablesBySchemaName(schemaName: string) : Promise<InformationSchemaTableDTO[]>
    findColumnsByNames(tableName: string, schemaName: string): Promise<InformationSchemaTableColumnDTO[]>
    
}