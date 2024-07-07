export class ListAllUseCaseTestTemplate {
  static render(className: string): string {
    const template = `
import { ListAll${className}UseCase } from "../../../../usecases/${className}/ListAll${className}UseCase"
import { repositoryMock } from "../../mock-repositories/repository-mock"

describe('ListAll${className}UseCase', () => {
    let usecase: ListAll${className}UseCase

    beforeEach(() => {
        usecase = new ListAll${className}UseCase(repositoryMock)
    })
    it('ListAll${className}UseCase handle', async () => {
        await usecase.handle()

        expect(repositoryMock.listAll).toHaveBeenCalledTimes(1)
    })
})
    `
    return template
  }
}

