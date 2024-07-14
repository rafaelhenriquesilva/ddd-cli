import { FindColumnsDatabaseService } from "./app/services/find-columns-database-service"
import { GenerateTableDetailService } from "./app/services/generate-table-detail-service"
import { GenerateTemplatesTableService } from "./app/services/generate-templates-table-service"
import { InformationSchemaTableColumnDTO } from "./domain/dto"
import { InformationSchemaRepository } from "./infra/repositories"

const createProject = async() => {
  const repository = new InformationSchemaRepository()
  const findColumnsDatabaseService = new FindColumnsDatabaseService(repository)
  const generateTableDetailService = new GenerateTableDetailService(repository)


  const mappingTableColumns: Map<string, InformationSchemaTableColumnDTO[]> | undefined =
        await findColumnsDatabaseService.execute('public')
  if (mappingTableColumns) {
    for (const key of mappingTableColumns.keys()) {

      const columnsTable: InformationSchemaTableColumnDTO[] | undefined = mappingTableColumns.get(key)
      if (columnsTable && columnsTable.length > 0) {
        const tableDetail = await generateTableDetailService.createTableDetailBySchemaDetail(columnsTable[0].schemaName, columnsTable[0].tableName, columnsTable)
        await GenerateTemplatesTableService.generateTemplatesByDatabaseInfo(tableDetail)
      }
    }
  } else {
    console.error('NO Have columns')
  }
}

createProject()