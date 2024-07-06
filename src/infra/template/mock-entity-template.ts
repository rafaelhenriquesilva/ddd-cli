import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto"
import { PostgresStringConverter } from "../converters/postgres-string-converter"

export class MockEntityTemplate {
    static render(className: string, columns: PostgresColumnDTO[]): string {
        let template = `
         import { faker } from '@faker-js/faker' \n
         import { DeveloperEntity } from "../../../../entities/DeveloperEntity"\n
         export const create${className}Mock = () => {
            return new ${className}Entity({`

        for (const column of columns) {
            template += `${column.camelCaseColumnName}: ${PostgresStringConverter.getMockByTsType(column)}, \n`
        }

        template += ` }) 
            }
         `
        return template
    }

}