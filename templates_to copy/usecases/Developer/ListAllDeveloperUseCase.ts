import { GlobalRepository } from "../../../src/domain/repositories";
import { DeveloperEntity } from "../../entities/DeveloperEntity";
import { IFindByIdDeveloperUseCase } from "../../interfaces/usecases/Developer/IFindByIdDeveloperUseCase";
import { IListAllDeveloperUseCase } from "../../interfaces/usecases/Developer/IListAllDeveloperUseCase";

export class ListAllDeveloperUseCase implements IListAllDeveloperUseCase {
    private repository: GlobalRepository<DeveloperEntity>

    constructor(
        repository: GlobalRepository<DeveloperEntity>
    ) {
        this.repository = repository
    }

    async handle(): Promise<DeveloperEntity[]> {
        const result = await this.repository.listAll()
        return result
    }
}