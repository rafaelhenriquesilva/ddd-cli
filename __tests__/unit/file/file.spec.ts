
import { TableDetailDTO } from '../../../src/domain/dto/table-detail/table-detail-dto'
import { InformationSchemaRepository } from '../../../src/infra/repositories'
import { GenerateTableDetailService } from '../../../src/infra/services/generate-table-detail-service'
import { FileUtil } from '../../../src/infra/util/file-util'
const pathFile = __dirname + './../../../new_code'

const createFile = async(folder:string, detail: TableDetailDTO, complement:string, 
  templateName: 
                'DTOTemplate' |
                'EntityTestTemplate' |
                'RepositoryTemplate' |
                'EntityTemplate' | 
                'RepositoryTestTemplate' |
                'GlobalRepositoryInterfaceTemplate',
  className?: string              
) => {
  const fileName = className ? className : `${detail.className}${complement}`
  const fileUtil = new FileUtil(pathFile)
  await fileUtil.generateFolder(folder)
  await fileUtil.generateFile(folder, fileName, detail[templateName])
}

describe('Generate a files, DTO, Entity, Entity Test and Repositorie', () => {
  let repository: InformationSchemaRepository
  let service: GenerateTableDetailService
  const schemaName: string = 'public'
  beforeAll(async() => {
    repository = new InformationSchemaRepository()
    service = new GenerateTableDetailService(repository)
  })
  it('Call Information Schema And create file by schema', async() => {
    const tableName = 'developer'
    const tableDetail = await service.createTableDetailBySchemaDetail(schemaName, tableName)
        
    await createFile('dto', tableDetail, 'DTO.ts', 'DTOTemplate')
    await createFile('entities', tableDetail, 'Entity.ts', 'EntityTemplate')
    await createFile('__tests__/unit/entities', tableDetail, 'Entity.spec.ts', 'EntityTestTemplate')
    await createFile('interfaces/repositories', tableDetail, '', 'GlobalRepositoryInterfaceTemplate', 'GlobalRepositoryInterface.ts')
    await createFile('repositories', tableDetail, 'Repository.ts', 'RepositoryTemplate')
    await createFile('__tests__/integration/repositories', tableDetail, 'Repository.spec.ts', 'RepositoryTestTemplate')

    expect(true).toBe(true)
  })
})