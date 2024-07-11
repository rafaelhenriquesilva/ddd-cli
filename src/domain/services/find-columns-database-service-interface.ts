import { InformationSchemaTableColumnDTO } from "../dto";

export interface IFindColumnsDatabaseService {
    execute(schemaName: string, tableName?:string): Promise<Map<String, InformationSchemaTableColumnDTO[]> | undefined>
}