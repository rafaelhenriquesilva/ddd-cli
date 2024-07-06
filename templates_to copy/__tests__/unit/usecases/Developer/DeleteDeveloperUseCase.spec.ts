
import { DeleteDeveloperUseCase } from "../../../../usecases/Developer/DeleteDeveloperUseCase"
import { createDeveloperMock } from "../../mock-entities/Developer/Developer-mock"
import { repositoryMock } from "../../mock-repositories/repository-mock"

describe('DeleteDeveloperUseCase', () => {
    let usecase: DeleteDeveloperUseCase

    beforeEach(() => {
        usecase = new DeleteDeveloperUseCase(repositoryMock)
    })
    it('DeleteDeveloperUseCase handle', async () => {
        const mock = createDeveloperMock()
        await usecase.handle(mock.id)

        expect(repositoryMock.deleteById).toHaveBeenCalledTimes(1)
    })
})