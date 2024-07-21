import { TableDetailDTO } from "../../domain/dto/table-detail/table-detail-dto"
import { FileUtil } from "../../infra/util/file-util"

export class GenerateTemplatesTableService {
  static isTest: boolean
  static pathFile = __dirname + '../../../../src/new_code'
  static async createFile(
    folder: string,
    detail: TableDetailDTO | any,
    templateName:
      | 'DTOTemplate'
      | 'EntityTestTemplate'
      | 'RepositoryTemplate'
      | 'EntityTemplate'
      | 'RepositoryTestTemplate'
      | 'GlobalRepositoryInterfaceTemplate'
      | 'MockEntityTemplate'
      | 'MockRepositoryTemplate'
      | 'ListAllUseCaseInterfaceTemplate'
      | 'ListAllUseCaseTemplate'
      | 'FindByIdUseCaseInterfaceTemplate'
      | 'FindByIdUseCaseTemplate'
      | 'DeleteUseCaseInterfaceTemplate'
      | 'DeleteUseCaseTemplate'
      | 'CreateUseCaseInterfaceTemplate'
      | 'CreateUseCaseTemplate'
      | 'UpdateUseCaseInterfaceTemplate'
      | 'UpdateUseCaseTemplate'
      | 'ListAllUseCaseTestTemplate'
      | 'FindByIdUseCaseTestTemplate'
      | 'DeleteUseCaseTestTemplate'
      | 'CreateUseCaseTestTemplate'
      | 'UpdateUseCaseTestTemplate',
    className: string,
    isUseCase: boolean = false
  ) {
    const fileUtil = new FileUtil(this.pathFile);
    const template = isUseCase
      ? detail.UseCaseDetail[templateName] || ''
      : detail[templateName];

      if(!template) {
        throw new Error('Method not implemented')
      }
  
    if (!this.isTest) {
      await fileUtil.generateFolder(folder);
      await fileUtil.generateFile(folder, className, template);
    }
  }

  static async generateTemplatesByDatabaseInfo(tableDetail: TableDetailDTO) {
    // Classe Global
    await this.createFile(`__tests__/unit/mock-repositories`, tableDetail, 'MockRepositoryTemplate', `repository-mock.ts`)


    // Camadas da tabela    
    await this.createFile('dto', tableDetail, 'DTOTemplate', `${tableDetail.className}DTO.ts`)
    await this.createFile('entities', tableDetail, 'EntityTemplate', `${tableDetail.className}Entity.ts`)
    await this.createFile('__tests__/unit/entities', tableDetail, 'EntityTestTemplate', `${tableDetail.className}Entity.spec.ts`)
    await this.createFile('interfaces/repositories', tableDetail, 'GlobalRepositoryInterfaceTemplate', 'GlobalRepositoryInterface.ts')
   await this.createFile('repositories', tableDetail, 'RepositoryTemplate', `${tableDetail.className}Repository.ts`)
    await this.createFile('__tests__/integration/repositories', tableDetail, 'RepositoryTestTemplate', `${tableDetail.className}Repository.spec.ts`)
    await this.createFile(`__tests__/unit/mock-entities/${tableDetail.className}`, tableDetail, 'MockEntityTemplate', `${tableDetail.className}-mock.ts`)
    

    //Usecases interfaces
    await this.createFile(`interfaces/usecases/${tableDetail.className}`, tableDetail, 'CreateUseCaseInterfaceTemplate', `ICreate${tableDetail.className}Usecase.ts`, true)
    await this.createFile(`interfaces/usecases/${tableDetail.className}`, tableDetail, 'ListAllUseCaseInterfaceTemplate', `IListAll${tableDetail.className}Usecase.ts`, true)
    await this.createFile(`interfaces/usecases/${tableDetail.className}`, tableDetail, 'FindByIdUseCaseInterfaceTemplate', `IFindById${tableDetail.className}Usecase.ts`, true)
    await this.createFile(`interfaces/usecases/${tableDetail.className}`, tableDetail, 'UpdateUseCaseInterfaceTemplate', `IUpdate${tableDetail.className}Usecase.ts`, true)
    await this.createFile(`interfaces/usecases/${tableDetail.className}`, tableDetail, 'DeleteUseCaseInterfaceTemplate', `IDelete${tableDetail.className}Usecase.ts`, true)

    //Usecases classes
    await this.createFile(`usecases/${tableDetail.className}`, tableDetail, 'CreateUseCaseTemplate', `Create${tableDetail.className}Usecase.ts`, true)
    await this.createFile(`usecases/${tableDetail.className}`, tableDetail, 'UpdateUseCaseTemplate', `Update${tableDetail.className}Usecase.ts`, true)
    await this.createFile(`usecases/${tableDetail.className}`, tableDetail, 'FindByIdUseCaseTemplate', `FindById${tableDetail.className}Usecase.ts`, true)
    await this.createFile(`usecases/${tableDetail.className}`, tableDetail, 'ListAllUseCaseTemplate', `ListAll${tableDetail.className}Usecase.ts`, true)
    await this.createFile(`usecases/${tableDetail.className}`, tableDetail, 'DeleteUseCaseTemplate', `Delete${tableDetail.className}Usecase.ts`, true)

    // UseCases Tests
    await this.createFile(`__tests__/unit/usecases/${tableDetail.className}`, tableDetail, 'CreateUseCaseTestTemplate', `Create${tableDetail.className}Usecase.spec.ts`, true)
    await this.createFile(`__tests__/unit/usecases/${tableDetail.className}`, tableDetail, 'UpdateUseCaseTestTemplate', `Update${tableDetail.className}Usecase.spec.ts`, true)
    await this.createFile(`__tests__/unit/usecases/${tableDetail.className}`, tableDetail, 'DeleteUseCaseTestTemplate', `Delete${tableDetail.className}Usecase.spec.ts`, true)
    await this.createFile(`__tests__/unit/usecases/${tableDetail.className}`, tableDetail, 'FindByIdUseCaseTestTemplate', `FindById${tableDetail.className}Usecase.spec.ts`, true)
    await this.createFile(`__tests__/unit/usecases/${tableDetail.className}`, tableDetail, 'ListAllUseCaseTestTemplate', `ListAll${tableDetail.className}Usecase.spec.ts`, true)
  }
}