import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"

export class FindByIdUseCaseTemplate {
    static render(className: string, columns: PostgresColumnDTO[]): string {
        let template = `
                import {GlobalRepositoryInterface} from '../../interfaces/repositories/GlobalRepositoryInterface'
                import { ${className}Entity } from "../../entities/${className}Entity";
                import { IFindById${className}UseCase } from "../../interfaces/usecases/${className}/IFindById${className}UseCase";

                export class FindById${className}UseCase implements IFindById${className}UseCase {
                    private repository: GlobalRepositoryInterface<${className}Entity>

                    constructor(
                        repository: GlobalRepositoryInterface<${className}Entity>
                    ) {
                        this.repository = repository
                    }
                    
                    async handle(id: string): Promise<${className}Entity | undefined> {
                        const result = await this.repository.findById(id)
                        if (result.length === 0) return undefined
                        return result[0]
                    }
                }
       \n`
      

        return template
    }
}

