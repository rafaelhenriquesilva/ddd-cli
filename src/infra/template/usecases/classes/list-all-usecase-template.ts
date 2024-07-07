import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"

export class ListAllUseCaseTemplate {
    static render(className: string, columns: PostgresColumnDTO[]): string {
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
                    }

                    async handle(): Promise<${className}Entity[]> {
                        const result = await this.repository.listAll()
                        return result
                    }
                }
       \n`
        return template
    }
}

