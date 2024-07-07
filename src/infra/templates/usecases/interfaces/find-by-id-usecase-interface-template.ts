export class FindByIdUseCaseInterfaceTemplate {
  static render(className: string): string {
    const template = `
            import { ${className}Entity } from "../../../entities/${className}Entity";

            export interface IFindById${className}UseCase {
                handle(id: string): Promise<${className}Entity | undefined>
            }

          `
    return template
  }
}