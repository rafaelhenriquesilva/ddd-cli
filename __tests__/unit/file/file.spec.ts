
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
                'GlobalRepositoryInterfaceTemplate' |
                'MockEntityTemplate' | 
                'MockRepositoryTemplate'
  ,className?: string              
) => {
  const fileName = className ? className : `${detail.className}${complement}`
  const fileUtil = new FileUtil(pathFile)
  await fileUtil.generateFolder(folder)
  await fileUtil.generateFile(folder, fileName, detail[templateName])
}

const createFileUseCase = async(folder:string, detail: TableDetailDTO,
  templateName: 
                'ListAllUseCaseInterfaceTemplate' |
                'ListAllUseCaseTemplate' |
                'FindByIdUseCaseInterfaceTemplate' |
                'FindByIdUseCaseTemplate' | 
                'DeleteUseCaseInterfaceTemplate' |
                'DeleteUseCaseTemplate' |
                'CreateUseCaseInterfaceTemplate' |
                'CreateUseCaseTemplate' |
                'UpdateUseCaseInterfaceTemplate' |
                'UpdateUseCaseTemplate'
  ,className: string              
) => {
  const template = detail.UseCaseDetail[templateName] ? detail.UseCaseDetail[templateName]  : '' 
  const fileUtil = new FileUtil(pathFile)
  await fileUtil.generateFolder(folder)
  fileUtil.generateFile(folder, className,template)
    
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

    // Classe Global
    await createFile(`__tests__/unit/mock-repositories`, tableDetail, '', 'MockRepositoryTemplate', `repository-mock.ts`)


    // Camadas da tabela    
    await createFile('dto', tableDetail, 'DTO.ts', 'DTOTemplate')
    await createFile('entities', tableDetail, 'Entity.ts', 'EntityTemplate')
    await createFile('__tests__/unit/entities', tableDetail, 'Entity.spec.ts', 'EntityTestTemplate')
    await createFile('interfaces/repositories', tableDetail, '', 'GlobalRepositoryInterfaceTemplate', 'GlobalRepositoryInterface.ts')
    await createFile('repositories', tableDetail, 'Repository.ts', 'RepositoryTemplate')
    await createFile('__tests__/integration/repositories', tableDetail, 'Repository.spec.ts', 'RepositoryTestTemplate')
    await createFile(`__tests__/unit/mock-entities/${tableDetail.className}`, tableDetail, '', 'MockEntityTemplate', `${tableDetail.className}-mock.ts`)
    

     //Usecases interfaces
    await createFileUseCase(`interfaces/usecases/${tableDetail.className}`, tableDetail, 'CreateUseCaseInterfaceTemplate', `ICreate${tableDetail.className}Usecase.ts`)
    await createFileUseCase(`interfaces/usecases/${tableDetail.className}`, tableDetail, 'ListAllUseCaseInterfaceTemplate', `IListAll${tableDetail.className}Usecase.ts`)
    await createFileUseCase(`interfaces/usecases/${tableDetail.className}`, tableDetail, 'FindByIdUseCaseInterfaceTemplate', `IFindById${tableDetail.className}Usecase.ts`)
    await createFileUseCase(`interfaces/usecases/${tableDetail.className}`, tableDetail, 'UpdateUseCaseInterfaceTemplate', `IUpdate${tableDetail.className}Usecase.ts`)
    await createFileUseCase(`interfaces/usecases/${tableDetail.className}`, tableDetail, 'DeleteUseCaseInterfaceTemplate', `IDelete${tableDetail.className}Usecase.ts`)

    //Usecases classes
    await createFileUseCase(`usecases/${tableDetail.className}`, tableDetail, 'CreateUseCaseTemplate', `Create${tableDetail.className}Usecase.ts`)
    await createFileUseCase(`usecases/${tableDetail.className}`, tableDetail, 'UpdateUseCaseTemplate', `Update${tableDetail.className}Usecase.ts`)
    await createFileUseCase(`usecases/${tableDetail.className}`, tableDetail, 'FindByIdUseCaseTemplate', `FindById${tableDetail.className}Usecase.ts`)
    await createFileUseCase(`usecases/${tableDetail.className}`, tableDetail, 'ListAllUseCaseTemplate', `ListAll${tableDetail.className}Usecase.ts`)
    await createFileUseCase(`usecases/${tableDetail.className}`, tableDetail, 'DeleteUseCaseTemplate', `Delete${tableDetail.className}Usecase.ts`)

    expect(true).toBe(true)
  })
})