import { InformationSchemaTableColumnDTO } from "../../domain/dto"
import { InformationSchemaRepositoryInterface } from "../../domain/repositories"
import { IFindColumnsDatabaseService } from "../../domain/services/find-columns-database-service-interface"


export class FindColumnsDatabaseService implements IFindColumnsDatabaseService{
    private repository: InformationSchemaRepositoryInterface
    constructor(repository: InformationSchemaRepositoryInterface) {
        this.repository = repository
    }

    async execute(schemaName: string, tableName?:string): Promise<Map<String, InformationSchemaTableColumnDTO[]> | undefined> {
        const columns = await this.repository.findColumnsByNames(schemaName, tableName)
        let mappingTableColumns: Map<String, InformationSchemaTableColumnDTO[]> = new Map() 

        if(columns.length === 0) {
            return undefined
        }

        for (const column of columns) {
            let listColumns = mappingTableColumns.get(column.tableName) || []
            listColumns.push(column)
            mappingTableColumns.set(column.tableName, listColumns)
        }

        return mappingTableColumns
    }
}