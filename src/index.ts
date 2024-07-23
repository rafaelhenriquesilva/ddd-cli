import { CLIService } from "./app/services/cli-service"
import { FindColumnsDatabaseService } from "./app/services/find-columns-database-service"
import { GenerateTableDetailService } from "./app/services/generate-table-detail-service"
import { GenerateTemplatesTableService } from "./app/services/generate-templates-table-service"
import { cloneDefaultFiles } from "./clone"
import { InformationSchemaTableColumnDTO } from "./domain/dto"
import { CLIParams } from "./domain/services/cli-service-interface"
import { InformationSchemaRepository } from "./infra/repositories"
const createProject = async(params: CLIParams) => {
  const repository = new InformationSchemaRepository()
  const findColumnsDatabaseService = new FindColumnsDatabaseService(repository)
  const generateTableDetailService = new GenerateTableDetailService(repository)

  const mappingTableColumns: Map<string, InformationSchemaTableColumnDTO[]> | undefined =
    await findColumnsDatabaseService.execute(params.schemaName, params.tableName)
  if (mappingTableColumns) {
    await cloneDefaultFiles()
    for (const key of mappingTableColumns.keys()) {

      const columnsTable: InformationSchemaTableColumnDTO[] | undefined = mappingTableColumns.get(key)
      if (columnsTable && columnsTable.length > 0) {
        const tableDetail = await generateTableDetailService.createTableDetailBySchemaDetail(columnsTable[0].schemaName, columnsTable[0].tableName, columnsTable)
        
        await GenerateTemplatesTableService.generateTemplatesByDatabaseInfo(tableDetail)
      } else {
        throw new Error('NO Have columns in database with this schema/table')
      }
    }
  } else {
    throw new Error('NO Have columns in database with this schema/table')
  }
}


const initializeCLI = async(): Promise<CLIParams> => {
  const cliService = new CLIService()
  return await cliService.execute()

}


const execute = async() => {
  const cliParams = await initializeCLI()
  createProject(cliParams)
}

execute()