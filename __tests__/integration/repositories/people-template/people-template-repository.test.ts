import { PeopleTemplateEntity } from '../../../../src/domain/entities';
import { PeopleTemplateRepository } from '../../../../src/infra/repositories'
import { faker } from '@faker-js/faker';

const createEntity = () => {
    const age = 27
    return new PeopleTemplateEntity({
        age,
        name: 'user_fake',
        birthDate: '1997-02-28',
        id: faker.number.int(),
        createdAt: new Date(),
        updatedAt: new Date()
    }) 
}

describe('PeopleTemplateRepository Actions', () => {
  let repository: PeopleTemplateRepository
  let dataId: number
  let data: PeopleTemplateEntity
  beforeAll(async() => {
    data = createEntity()
    repository = new PeopleTemplateRepository()
  })

  it('PeopleTemplateRepository Insert', async() => {
    const result = await repository.insert(data)
    dataId = result && result.length > 0 && typeof result[0].id == 'number' ? result[0].id : 0 
    expect(result[0].id).toBeDefined()
  })

  it('PeopleTemplateRepository Update', async() => {
    await repository.update({
      age: 20,
      id: dataId
    })
  })

  
  it('PeopleTemplateRepository Find By Id', async() => {
     
    const result = await repository.findById(dataId)
    expect(result.length).toBe(1)
    expect(result[0].age).toBe(20)
  })

  it('PeopleTemplateRepository List All', async() => {
    const result = await repository.listAll()
    expect(result.length > 0).toBe(true)
  })

  it('PeopleTemplateRepository Delete', async() => {
    await repository.deleteById(dataId)
    
    const result = await repository.findById(dataId)
   
    expect(result.length).toBe(0)
    
  })

})