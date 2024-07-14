

import {DeveloperSeqRepository} from '../../../../src/infra/database/sequelize-repositories/developer-seq-repository'
import {createDeveloperMock} from '../../../../src/new_code/__tests__/unit/mock-entities/Developer/Developer-mock'
import { DeveloperEntity } from '../../../../src/new_code/entities/DeveloperEntity'
import sequelize from '../../../../src/infra/database/sequelize/sequelize-adapter'

describe('DeveloperRepository Actions', () => {
  let repository: DeveloperSeqRepository
  let dataId: string
  let data: DeveloperEntity
  let mockToUpdate: DeveloperEntity
  beforeAll(async() => {
    await sequelize.sync()
    data = createDeveloperMock()
    repository = new DeveloperSeqRepository()
  })

  it('DeveloperRepository Insert', async() => {
    const result = await repository.insert({
      email: data.email, 
      name: data.name, 
    })
    dataId = result && result.length > 0 && typeof result[0]?.id == 'string' ? result[0]?.id : '' 
    expect(result[0]?.id).toBeDefined()
  })

  it('DeveloperRepository Update', async() => {
    mockToUpdate = createDeveloperMock()
    await repository.update({
      id: dataId,
      email: mockToUpdate.email, 
      name: mockToUpdate.name, 
    })
  })

                
  it('DeveloperRepository Find By Id', async() => {
    const result = await repository.findById(dataId)
    expect(result.length).toBe(1)
    expect(result[0].email).toBe(mockToUpdate.email) 
    expect(result[0].name).toBe(mockToUpdate.name) 

  })

  it('DeveloperRepository List All', async() => {
    const result = await repository.listAll()
    expect(result.length > 0).toBe(true)
  })

  it('DeveloperRepository Delete', async() => {
    await repository.deleteById(dataId)
                    
    const result = await repository.findById(dataId)
                
    expect(result.length).toBe(0)
                    
  })

})
        