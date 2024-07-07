import { PostgresColumnDTO } from "../../../../domain/@shared/dto/postgres-column-dto"


export class UpdateUseCaseTemplate {
    static render(className: string, columns: PostgresColumnDTO[]): string {
        const columnsToUpdate = columns.filter(column => column.columnDefault === null)
        const idColumn = columns.find(column => column.columnName === 'id')
        let template = `
        import {GlobalRepositoryInterface} from '../../interfaces/repositories/GlobalRepositoryInterface'
        import { ${className}Entity } from "../../entities/${className}Entity";
        import { inputUpdate${className}, IUpdate${className}UseCase } from "../../interfaces/usecases/${className}/IUpdate${className}UseCase";

        export class Update${className}UseCase implements IUpdate${className}UseCase {
            private repository: GlobalRepositoryInterface<${className}Entity>

            constructor(
                repository: GlobalRepositoryInterface<${className}Entity>
            ) {
                this.repository = repository
            }

            async handle(input: inputUpdate${className}): Promise<void> {
                await this.repository.update({
       \n`
        if (idColumn) {
            template += `${idColumn.camelCaseColumnName}: input.${idColumn.camelCaseColumnName}, \n`
        }
        for (const column of columnsToUpdate) {

            template += `${column.camelCaseColumnName}: input.${column.camelCaseColumnName}, \n`
        }

        template += `\n })
                }

            }`
        return template
    }
}

