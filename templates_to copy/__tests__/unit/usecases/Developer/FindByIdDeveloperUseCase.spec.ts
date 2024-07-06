
import { FindByIdDeveloperUseCase } from "../../../../usecases/Developer/FindByIdDeveloperUseCase"
import { createDeveloperMock } from "../../mock-entities/Developer/Developer-mock"
import { repositoryMock } from "../../mock-repositories/repository-mock"

describe('FindByIdDeveloperUseCase', () => {
    let usecase: FindByIdDeveloperUseCase

    beforeEach(() => {
        usecase = new FindByIdDeveloperUseCase(repositoryMock)
    })
    it('FindByIdDeveloperUseCase handle', async () => {
        const mock = createDeveloperMock()
        repositoryMock.findById.mockResolvedValue([mock])
        await usecase.handle(mock.id)

        expect(repositoryMock.findById).toHaveBeenCalledTimes(1)
    })
})