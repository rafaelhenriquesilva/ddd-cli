import { DeveloperEntity } from "../../../entities/DeveloperEntity";

export interface IListAllDeveloperUseCase {
    handle(): Promise<DeveloperEntity[]>
}


