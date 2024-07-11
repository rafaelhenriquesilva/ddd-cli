import { InformationSchemaTableColumnDTO } from "../../../src/domain/dto"
import { InformationSchemaRepository } from "../../../src/infra/repositories"
import { FindColumnsDatabaseService } from "../../../src/app/services/find-columns-database-service"


describe('FindColumnsDatabaseService', () => {
    let service: FindColumnsDatabaseService
    let repository: InformationSchemaRepository
    beforeAll(() => {
        repository = new InformationSchemaRepository()
        service = new FindColumnsDatabaseService(repository)
    })
    it('init', async () => {
        let mappingTableColumns: Map<String, InformationSchemaTableColumnDTO[]> | undefined =
         await service.execute('public')
        if(mappingTableColumns) {
            for(let key of mappingTableColumns.keys()) {
           
                const columnsTable: InformationSchemaTableColumnDTO[] | undefined= mappingTableColumns.get(key)
                if(columnsTable) {
                    console.info(columnsTable)
                    expect(columnsTable.length > 0).toBe(true)
                }
            }
        } else {
            console.error('NO Have columns')
        }
       

    })
})