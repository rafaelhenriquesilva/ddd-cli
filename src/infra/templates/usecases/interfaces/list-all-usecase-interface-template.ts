export class ListAllUseCaseInterfaceTemplate {
  static render(className: string): string {
    const template = `
            import { ${className}Entity } from "../../../entities/${className}Entity";

            export interface IListAll${className}UseCase {
                handle(): Promise<${className}Entity[]>
            }

          `
    return template
  }
}