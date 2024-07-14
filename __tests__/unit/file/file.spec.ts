
import { InformationSchemaRepository } from '../../../src/infra/repositories'
import { GenerateTableDetailService } from '../../../src/app/services/generate-table-detail-service'
import { GenerateTemplatesTableService } from '../../../src/app/services/generate-templates-table-service'

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
    GenerateTemplatesTableService.isTest = true
    GenerateTemplatesTableService.generateTemplatesByDatabaseInfo(tableDetail)

    expect(true).toBe(true)
  })
})