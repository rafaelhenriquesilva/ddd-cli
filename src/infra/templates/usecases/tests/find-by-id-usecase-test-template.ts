export class FindByIdUseCaseTestTemplate {
  static render(className: string): string {
    let template = `
import { FindById${className}UseCase } from "../../../../usecases/${className}/FindById${className}UseCase"
import { create${className}Mock } from "../../mock-entities/${className}/${className}-mock"
import { repositoryMock } from "../../mock-repositories/repository-mock"

describe('FindById${className}UseCase', () => {
    let usecase: FindById${className}UseCase

    beforeEach(() => {
        usecase = new FindById${className}UseCase(repositoryMock)
    })`
    template += this.createHandleTestTemplate(className)

    template += `})`
    return template
  }

  static createHandleTestTemplate(className: string): string {
    return `
  it('FindById${className}UseCase handle', async () => {
        const mock = create${className}Mock()
        repositoryMock.findById.mockResolvedValue([mock])
        await usecase.handle(mock.id)

        expect(repositoryMock.findById).toHaveBeenCalledTimes(1)
  })
    `
  }
}

