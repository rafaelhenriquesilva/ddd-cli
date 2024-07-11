export class ListAllUseCaseTemplate {
  static render(className: string): string {
    let template = `
                import {GlobalRepositoryInterface} from '../../interfaces/repositories/GlobalRepositoryInterface'
                import { ${className}Entity } from "../../entities/${className}Entity";
                import { IListAll${className}UseCase } from "../../interfaces/usecases/${className}/IListAll${className}UseCase";

                export class ListAll${className}UseCase implements IListAll${className}UseCase {
                    private repository: GlobalRepositoryInterface<${className}Entity>

                    constructor(
                        repository: GlobalRepositoryInterface<${className}Entity>
                    ) {
                        this.repository = repository
                    }`
                    
    template += this.createHandleMethod(className)
    template +=`}\n`
    return template
  }

  
  static createHandleMethod(className: string): string {
    return `
async handle(): Promise<${className}Entity[]> {
  const result = await this.repository.listAll()
  return result
}
    `
  }
}

