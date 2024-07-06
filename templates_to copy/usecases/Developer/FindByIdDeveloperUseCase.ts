import { GlobalRepository } from "../../../src/domain/repositories";
import { DeveloperEntity } from "../../entities/DeveloperEntity";
import { IFindByIdDeveloperUseCase } from "../../interfaces/usecases/Developer/IFindByIdDeveloperUseCase";

export class FindByIdDeveloperUseCase implements IFindByIdDeveloperUseCase {
    private repository: GlobalRepository<DeveloperEntity>

    constructor(
        repository: GlobalRepository<DeveloperEntity>
    ) {
        this.repository = repository
    }

    async handle(id: string): Promise<DeveloperEntity | undefined> {
        const result = await this.repository.findById(id)
        if (result.length === 0) return undefined
        return result[0]
    }
}