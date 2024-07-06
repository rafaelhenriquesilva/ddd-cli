import { createDeveloperMock } from '../mock-entities/Developer/Developer-mock'

describe('Generate a Entity Developer', () => {
   it('should be entity values', async () => {
      const entity = createDeveloperMock()
      expect(entity.toJson()).toEqual({
         id: entity.id,
         name: entity.name,
         email: entity.email,
         createdAt: entity.createdAt,
         updatedAt: entity.updatedAt,
      })
   })
})