import { GlobalRepository } from "../../../src/domain/repositories";
import { DeveloperEntity } from "../../entities/DeveloperEntity";
import { inputUpdateDeveloper, IUpdateDeveloperUseCase } from "../../interfaces/usecases/Developer/IUpdateDeveloperUseCase";

export class UpdateDeveloperUseCase implements IUpdateDeveloperUseCase {
    private repository: GlobalRepository<DeveloperEntity>

    constructor(
        repository: GlobalRepository<DeveloperEntity>
    ) {
        this.repository = repository
    }

    async handle(input: inputUpdateDeveloper): Promise<void> {
        await this.repository.update({
            id: input.id,
            email: input.email,
            name: input.name
        })
    }

}