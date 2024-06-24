
import { TableDetailDTO } from '../../../src/domain/dto/table-detail/table-detail-dto'
import { InformationSchemaRepository } from '../../../src/infra/repositories'
import { GenerateTableDetailService } from '../../../src/infra/services/generate-table-detail-service'
import { FileUtil } from '../../../src/infra/util/file-util'
const pathFile = __dirname + './../../../'

const createDTOFile = async(folder:string, detail: TableDetailDTO) => {
  const fileUtil = new FileUtil(pathFile);
  await fileUtil.generateFolder(folder)
  await fileUtil.generateFile(folder, `${detail.className}DTO.ts`, detail.DTOTemplate)
}

describe('Generate a file DTO', () => {
  let repository: InformationSchemaRepository
  let service: GenerateTableDetailService
  const schemaName: string = 'public'
  beforeAll(async() => {
    repository = new InformationSchemaRepository()
    service = new GenerateTableDetailService(repository)
  })
  it('Call Information Schema And create file by schema', async() => {
    const tableName = 'all_data_types'
    const tableDetail = await service.createTableDetailBySchemaDetail(schemaName, tableName)
    //const listFields = stringToObjArray(tsTypes)
        
    await createDTOFile('dto', tableDetail)

    expect(true).toBe(true)
  })
})