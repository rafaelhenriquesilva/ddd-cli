export class ListAllUseCaseTestTemplate {
  static render(className: string): string {
    let template = `
import { ListAll${className}UseCase } from "../../../../usecases/${className}/ListAll${className}Usecase"
import { repositoryMock } from "../../mock-repositories/repository-mock"

describe('ListAll${className}UseCase', () => {
    let usecase: ListAll${className}UseCase

    beforeEach(() => {
        usecase = new ListAll${className}UseCase(repositoryMock)
    })`
    template += this.createHandleTestTemplate(className)
    template += `})`
    return template
  }

  static createHandleTestTemplate(className: string): string {
    return `
  it('ListAll${className}UseCase handle', async () => {
        await usecase.handle()

        expect(repositoryMock.listAll).toHaveBeenCalledTimes(1)
    })
    `
  }
}

