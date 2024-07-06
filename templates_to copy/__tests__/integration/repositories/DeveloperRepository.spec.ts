
import { DeveloperEntity } from '../../../entities/DeveloperEntity'
import { DeveloperRepository } from '../../../repositories/DeveloperRepository'
import { createDeveloperMock } from '../../unit/mock-entities/Developer/Developer-mock'


describe('DeveloperRepository Actions', () => {
  let repository: DeveloperRepository
  let dataId: string
  let data: DeveloperEntity
  let mockToUpdate: DeveloperEntity
  beforeAll(async () => {
    data = createDeveloperMock()
    repository = new DeveloperRepository()
  })

  it('DeveloperRepository Insert', async () => {
    const result = await repository.insert(data)
    dataId = result && result.length > 0 && typeof result[0]?.id == 'string' ? result[0]?.id : ''
    expect(result[0]?.id).toBeDefined()
  })

  it('DeveloperRepository Update', async () => {
    mockToUpdate = createDeveloperMock()
    await repository.update({
      id: dataId,
      name: mockToUpdate.name,
      email: mockToUpdate.email,
    })
  })


  it('DeveloperRepository Find By Id', async () => {
    const result = await repository.findById(dataId)
    expect(result.length).toBe(1)
    expect(result[0].name).toBe(mockToUpdate.name)
    expect(result[0].email).toBe(mockToUpdate.email)

  })

  it('DeveloperRepository List All', async () => {
    const result = await repository.listAll()
    expect(result.length > 0).toBe(true)
  })

  it('DeveloperRepository Delete', async () => {
    await repository.deleteById(dataId)

    const result = await repository.findById(dataId)

    expect(result.length).toBe(0)

  })

})
