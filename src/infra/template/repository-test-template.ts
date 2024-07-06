import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto"
import { PostgresStringConverter } from "../converters/postgres-string-converter"

export class RepositoryTestTemplate {
    static render(className: string, columns: PostgresColumnDTO[]): string {
        let id: any = columns.find(data => data.camelCaseColumnName === 'id') || 'any'

        const fieldsToInsertOrUpdate = (): PostgresColumnDTO[] => {
            const fields = columns.filter(
                (data) => data.camelCaseColumnName !== "id" &&
                    data.camelCaseColumnName !== "createdAt" &&
                    data.camelCaseColumnName !== "updatedAt"
            )

            return fields
        }

        let template = `
       import { ${className}Entity } from '../../../entities/${className}Entity'
       import { ${className}Repository } from '../../../repositories/${className}Repository'
       import { create${className}Mock } from '../../unit/mock-entities/${className}/${className}-mock'
        

         describe('${className}Repository Actions', () => {
                let repository: ${className}Repository
                let dataId: ${id?.dataTypeTS}
                let data: ${className}Entity
                let mockToUpdate: ${className}Entity
                beforeAll(async() => {
                    data = createDeveloperMock()
                    repository = new ${className}Repository()
                })

                it('${className}Repository Insert', async() => {
                    const result = await repository.insert(data)
                    dataId = result && result.length > 0 && typeof result[0]?.id == '${id?.dataTypeTS}' ? result[0]?.id : '' 
                    expect(result[0]?.id).toBeDefined()
                })

                it('${className}Repository Update', async() => {
                    mockToUpdate = createDeveloperMock()
                    await repository.update({
                        id: dataId,
                   `;

                    for(const data of fieldsToInsertOrUpdate()) {
                        template += `${data.camelCaseColumnName}: mockToUpdate.${data.camelCaseColumnName}, \n`
                    }
                   
                   
                   template +=` })
                })

                
                it('${className}Repository Find By Id', async() => {
                         const result = await repository.findById(dataId)
                         expect(result.length).toBe(1)
                `
                for(const data of fieldsToInsertOrUpdate()) {
                    template += `expect(result[0].${data.camelCaseColumnName}).toBe(mockToUpdate.${data.camelCaseColumnName}) \n`
                }
                
                template += `
                })

               it('${className}Repository List All', async() => {
                 const result = await repository.listAll()
                 expect(result.length > 0).toBe(true)
               })

               it('${className}Repository Delete', async() => {
                 await repository.deleteById(dataId)
                    
                 const result = await repository.findById(dataId)
                
                 expect(result.length).toBe(0)
                    
               })

        })
        `

        return template
    }
}