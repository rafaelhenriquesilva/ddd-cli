import { faker } from '@faker-js/faker';
import {PeopleTemplateEntity} from '../../../../src/domain/entities'
const createEntity = () => {
    const age = faker.number.int()
    return new PeopleTemplateEntity({
        age,
        name: faker.string.sample(),
        birthDate: new Date(new Date().setFullYear(-(age))),
        id: faker.number.int()
    }) 
}

describe('People Entity ', () => {
    let people: PeopleTemplateEntity
    it('create a People Entity', () => {
        people = createEntity()

        expect(people.toJson()).toEqual({
            id: people.id,
            name: people.name,
            age: people.age,
            birthDate: people.birthDate
        })
    })
    it('update a People Entity', () => {
        const mockToUpdate = createEntity()
        const birthDate = new Date(new Date().setDate(-(mockToUpdate.age)))
        people.age = mockToUpdate.age
        people.name = mockToUpdate.name
        people.birthDate = birthDate

        expect(people.toJson()).toEqual({
            id: people.id,
            name: mockToUpdate.name,
            age: mockToUpdate.age,
            birthDate
        })
    })
})