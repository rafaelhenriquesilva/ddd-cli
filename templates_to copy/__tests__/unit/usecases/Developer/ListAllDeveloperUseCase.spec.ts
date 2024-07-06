
import { ListAllDeveloperUseCase } from "../../../../usecases/Developer/ListAllDeveloperUseCase"
import { repositoryMock } from "../../mock-repositories/repository-mock"

describe('ListAllDeveloperUseCase', () => {
    let usecase: ListAllDeveloperUseCase

    beforeEach(() => {
        usecase = new ListAllDeveloperUseCase(repositoryMock)
    })
    it('ListAllDeveloperUseCase handle', async () => {
        await usecase.handle()

        expect(repositoryMock.listAll).toHaveBeenCalledTimes(1)
    })
})