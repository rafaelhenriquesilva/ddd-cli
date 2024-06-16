import { InformationSchemaTableColumnDTO, InformationSchemaTableDTO } from "../../dto"

export interface InformationSchemaRepositoryInterface {
    findTablesBySchemaName(schemaName: string) : Promise<InformationSchemaTableDTO[]>
    findColumnsByNames(tableName: string, schemaName: string): Promise<InformationSchemaTableColumnDTO[]>
    
}