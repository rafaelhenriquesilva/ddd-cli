import { PeopleEntity } from '../../../../new_code/entities/PeopleEntity'
import { PeopleRepository } from '../../../../new_code/repositories/PeopleRepository'

import { faker } from '@faker-js/faker'

const createEntity = () => {
  const age = 27
  return new PeopleEntity({
    age,
    name: 'user_fake',
    birthDate: '1997-02-28',
    id: faker.number.int(),
    createdAt: new Date(),
    updatedAt: new Date()
  }) 
}

describe('PeopleTemplateRepository Actions', () => {
  let repository: PeopleRepository
  let dataId: number
  let data: PeopleEntity
  beforeAll(async() => {
    data = createEntity()
    repository = new PeopleRepository()
  })

  it('PeopleRepository Insert', async() => {
    const result = await repository.insert(data)
    dataId = result && result.length > 0 && typeof result[0]?.id == 'number' ? result[0]?.id : 0 
    expect(result[0]?.id).toBeDefined()
  })

  it('PeopleRepository Update', async() => {
    await repository.update({
      age: 20,
      id: dataId
    })
  })

  
  it('PeopleRepository Find By Id', async() => {
     
    const result = await repository.findById(dataId)
    expect(result.length).toBe(1)
    expect(result[0].age).toBe(20)
  })

  it('PeopleRepository List All', async() => {
    const result = await repository.listAll()
    expect(result.length > 0).toBe(true)
  })

  it('PeopleRepository Delete', async() => {
    await repository.deleteById(dataId)
    
    const result = await repository.findById(dataId)
   
    expect(result.length).toBe(0)
    
  })

})