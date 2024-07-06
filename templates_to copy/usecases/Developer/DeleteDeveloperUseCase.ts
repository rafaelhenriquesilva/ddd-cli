import { GlobalRepository } from "../../../src/domain/repositories";
import { DeveloperEntity } from "../../entities/DeveloperEntity";
import { IDeleteDeveloperUseCase } from "../../interfaces/usecases/Developer/IDeleteDeveloperUseCase";

export class DeleteDeveloperUseCase implements IDeleteDeveloperUseCase {
    private repository: GlobalRepository<DeveloperEntity>

    constructor(
        repository: GlobalRepository<DeveloperEntity>
    ) {
        this.repository = repository
    }
    
    async handle(id: string): Promise<void> {
        await this.repository.deleteById(id)
    }
}