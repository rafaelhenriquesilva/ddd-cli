
import { UpdateDeveloperUseCase } from "../../../../usecases/Developer/UpdateDeveloperUseCase"
import { createDeveloperMock } from "../../mock-entities/Developer/Developer-mock"
import { repositoryMock } from "../../mock-repositories/repository-mock"

describe('UpdateDeveloperUseCase', () => {
    let usecase: UpdateDeveloperUseCase

    beforeEach(() => {
        usecase = new UpdateDeveloperUseCase(repositoryMock)
    })
    it('UpdateDeveloperUseCase handle', async () => {
        const mock = createDeveloperMock()
        await usecase.handle({
            id: mock.id,
            email: mock.email,
            name: mock.name
        })

        expect(repositoryMock.update).toHaveBeenCalledTimes(1)
    })
})