export class DeleteUseCaseInterfaceTemplate {
  static render(className: string): string {
    const template = `
            export interface IDelete${className}UseCase {
                handle(id: string): Promise<void>
            }

          `
    return template
  }
}