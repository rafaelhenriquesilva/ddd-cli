
export class DeleteUseCaseTestTemplate {
  static render(className: string): string {
    let template = `
           import { Delete${className}UseCase } from "../../../../usecases/${className}/Delete${className}Usecase"
            import { create${className}Mock } from "../../mock-entities/${className}/${className}-mock"
            import { repositoryMock } from "../../mock-repositories/repository-mock"

            describe('Delete${className}UseCase', () => {
                let usecase: Delete${className}UseCase

                beforeEach(() => {
                    usecase = new Delete${className}UseCase(repositoryMock)
                })`

    template += this.createHandleTestTemplate(className)

    template += `})`
    return template
  }

  static createHandleTestTemplate(className: string): string {
    return `
 it('Delete${className}UseCase handle', async () => {
    const mock = create${className}Mock()
    await usecase.handle(mock.id)
      expect(repositoryMock.deleteById).toHaveBeenCalledTimes(1)
  })
    `
  }
}

