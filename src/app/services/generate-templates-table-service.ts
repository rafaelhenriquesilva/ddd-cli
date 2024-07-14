import { TableDetailDTO } from "../../domain/dto/table-detail/table-detail-dto"
import { FileUtil } from "../../infra/util/file-util"

export class GenerateTemplatesTableService {
  static isTest: boolean
  static pathFile = __dirname + '../../../../src/new_code'
  static async createFile(folder: string, detail: TableDetailDTO, complement: string,
    templateName:
            'DTOTemplate' |
            'EntityTestTemplate' |
            'RepositoryTemplate' |
            'EntityTemplate' |
            'RepositoryTestTemplate' |
            'GlobalRepositoryInterfaceTemplate' |
            'MockEntityTemplate' |
            'MockRepositoryTemplate'
    , className?: string
  ) {
    const fileName = className ? className : `${detail.className}${complement}`
    const fileUtil = new FileUtil(this.pathFile)
    if(!this.isTest) {
      await fileUtil.generateFolder(folder)
      await fileUtil.generateFile(folder, fileName, detail[templateName])
    }
   
  }

  static async createFileUseCase(folder: string, detail: TableDetailDTO,
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
            'UpdateUseCaseTemplate' |
            'ListAllUseCaseTestTemplate' |
            'FindByIdUseCaseTestTemplate' |
            'DeleteUseCaseTestTemplate' |
            'CreateUseCaseTestTemplate' |
            'UpdateUseCaseTestTemplate'
    , className: string
  ) {
    const template = detail.UseCaseDetail[templateName] ? detail.UseCaseDetail[templateName] : ''
    const fileUtil = new FileUtil(this.pathFile)
    if(!this.isTest) {
      await fileUtil.generateFolder(folder)
      fileUtil.generateFile(folder, className, template)
    }
  
  }

  static async generateTemplatesByDatabaseInfo(tableDetail: TableDetailDTO) {
    // Classe Global
    await this.createFile(`__tests__/unit/mock-repositories`, tableDetail, '', 'MockRepositoryTemplate', `repository-mock.ts`)


    // Camadas da tabela    
    await this.createFile('dto', tableDetail, 'DTO.ts', 'DTOTemplate')
    await this.createFile('entities', tableDetail, 'Entity.ts', 'EntityTemplate')
    await this.createFile('__tests__/unit/entities', tableDetail, 'Entity.spec.ts', 'EntityTestTemplate')
    await this.createFile('interfaces/repositories', tableDetail, '', 'GlobalRepositoryInterfaceTemplate', 'GlobalRepositoryInterface.ts')
    await this.createFile('repositories', tableDetail, 'Repository.ts', 'RepositoryTemplate')
    await this.createFile('__tests__/integration/repositories', tableDetail, 'Repository.spec.ts', 'RepositoryTestTemplate')
    await this.createFile(`__tests__/unit/mock-entities/${tableDetail.className}`, tableDetail, '', 'MockEntityTemplate', `${tableDetail.className}-mock.ts`)
    

    //Usecases interfaces
    await this.createFileUseCase(`interfaces/usecases/${tableDetail.className}`, tableDetail, 'CreateUseCaseInterfaceTemplate', `ICreate${tableDetail.className}Usecase.ts`)
    await this.createFileUseCase(`interfaces/usecases/${tableDetail.className}`, tableDetail, 'ListAllUseCaseInterfaceTemplate', `IListAll${tableDetail.className}Usecase.ts`)
    await this.createFileUseCase(`interfaces/usecases/${tableDetail.className}`, tableDetail, 'FindByIdUseCaseInterfaceTemplate', `IFindById${tableDetail.className}Usecase.ts`)
    await this.createFileUseCase(`interfaces/usecases/${tableDetail.className}`, tableDetail, 'UpdateUseCaseInterfaceTemplate', `IUpdate${tableDetail.className}Usecase.ts`)
    await this.createFileUseCase(`interfaces/usecases/${tableDetail.className}`, tableDetail, 'DeleteUseCaseInterfaceTemplate', `IDelete${tableDetail.className}Usecase.ts`)

    //Usecases classes
    await this.createFileUseCase(`usecases/${tableDetail.className}`, tableDetail, 'CreateUseCaseTemplate', `Create${tableDetail.className}Usecase.ts`)
    await this.createFileUseCase(`usecases/${tableDetail.className}`, tableDetail, 'UpdateUseCaseTemplate', `Update${tableDetail.className}Usecase.ts`)
    await this.createFileUseCase(`usecases/${tableDetail.className}`, tableDetail, 'FindByIdUseCaseTemplate', `FindById${tableDetail.className}Usecase.ts`)
    await this.createFileUseCase(`usecases/${tableDetail.className}`, tableDetail, 'ListAllUseCaseTemplate', `ListAll${tableDetail.className}Usecase.ts`)
    await this.createFileUseCase(`usecases/${tableDetail.className}`, tableDetail, 'DeleteUseCaseTemplate', `Delete${tableDetail.className}Usecase.ts`)

    // UseCases Tests
    await this.createFileUseCase(`__tests__/unit/usecases/${tableDetail.className}`, tableDetail, 'CreateUseCaseTestTemplate', `Create${tableDetail.className}Usecase.spec.ts`)
    await this.createFileUseCase(`__tests__/unit/usecases/${tableDetail.className}`, tableDetail, 'UpdateUseCaseTestTemplate', `Update${tableDetail.className}Usecase.spec.ts`)
    await this.createFileUseCase(`__tests__/unit/usecases/${tableDetail.className}`, tableDetail, 'DeleteUseCaseTestTemplate', `Delete${tableDetail.className}Usecase.spec.ts`)
    await this.createFileUseCase(`__tests__/unit/usecases/${tableDetail.className}`, tableDetail, 'FindByIdUseCaseTestTemplate', `FindById${tableDetail.className}Usecase.spec.ts`)
    await this.createFileUseCase(`__tests__/unit/usecases/${tableDetail.className}`, tableDetail, 'ListAllUseCaseTestTemplate', `ListAll${tableDetail.className}Usecase.spec.ts`)
  }
}