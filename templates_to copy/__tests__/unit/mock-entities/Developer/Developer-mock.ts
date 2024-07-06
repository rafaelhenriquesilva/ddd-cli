import { DeveloperEntity } from "../../../../entities/DeveloperEntity"
import { faker } from '@faker-js/faker'

export const createDeveloperMock = () => {
    return new DeveloperEntity({
       id: faker.string.uuid(),
       name: faker.lorem.text(),
       email: faker.lorem.text(),
       createdAt: new Date(),
       updatedAt: new Date(),
    })
 }