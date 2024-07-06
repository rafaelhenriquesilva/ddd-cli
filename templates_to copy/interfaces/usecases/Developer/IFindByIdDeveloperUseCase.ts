import { DeveloperEntity } from "../../../entities/DeveloperEntity";

export interface IFindByIdDeveloperUseCase {
    handle(id: string): Promise<DeveloperEntity | undefined>
}
