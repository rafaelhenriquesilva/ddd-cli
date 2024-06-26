
import { TableDetailDTO } from '../../../src/domain/dto/table-detail/table-detail-dto'
import { InformationSchemaRepository } from '../../../src/infra/repositories'
import { GenerateTableDetailService } from '../../../src/infra/services/generate-table-detail-service'
import { FileUtil } from '../../../src/infra/util/file-util'
const pathFile = __dirname + './../../../new_code'

const createFolderNewCode = async() => {
  const fileUtil = new FileUtil(__dirname + './../../../')
  await fileUtil.generateFolder('new_code')
}

const createEntityTestFile = async(folder:string, detail: TableDetailDTO) => {
  const fileUtil = new FileUtil(pathFile)
  await fileUtil.generateFolder(folder)
  await fileUtil.generateFile(folder, `${detail.className}Entity.spec.ts`, detail.EntityTestTemplate)
}

describe('Generate a file Entity Class Test', () => {
  let repository: InformationSchemaRepository
  let service: GenerateTableDetailService
  const schemaName: string = 'public'
  beforeAll(async() => {
    repository = new InformationSchemaRepository()
    service = new GenerateTableDetailService(repository)
    await createFolderNewCode()
  })
  it('Call Information Schema And create file by schema', async() => {
    const tableName = 'all_data_types'
    const tableDetail = await service.createTableDetailBySchemaDetail(schemaName, tableName)
        
    await createEntityTestFile('test', tableDetail)

    expect(true).toBe(true)
  })
})