import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"

export class DeleteUseCaseTemplate {
    static render(className: string, columns: PostgresColumnDTO[]): string {
        let template = `
                import {GlobalRepositoryInterface} from '../../interfaces/repositories/GlobalRepositoryInterface'
                import { ${className}Entity } from "../../entities/${className}Entity";
                import { IDelete${className}UseCase } from "../../interfaces/usecases/${className}/IDelete${className}UseCase";

                export class Delete${className}UseCase implements IDelete${className}UseCase {
                    private repository: GlobalRepositoryInterface<${className}Entity>

                    constructor(
                        repository: GlobalRepositoryInterface<${className}Entity>
                    ) {
                        this.repository = repository
                    }
                    
                    async handle(id: string): Promise<void> {
                        await this.repository.deleteById(id)
                    }
                }
       \n`
      

        return template
    }
}

