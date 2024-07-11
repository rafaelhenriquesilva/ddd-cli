import { InformationSchemaTableColumnDTO, InformationSchemaTableDTO } from "../../dto"

export interface InformationSchemaRepositoryInterface {
    findTablesBySchemaName(schemaName: string) : Promise<InformationSchemaTableDTO[]>
    findColumnsByNames(schemaName: string, tableName?: string): Promise<InformationSchemaTableColumnDTO[]>
    
}