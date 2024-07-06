import { GlobalRepository } from "../../../src/domain/repositories";
import { DeveloperEntity } from "../../entities/DeveloperEntity";
import { ICreateDeveloperUseCase, inputCreateDeveloper } from "../../interfaces/usecases/Developer/ICreateDeveloperUseCase";

export class CreateDeveloperUseCase implements ICreateDeveloperUseCase {
    private repository: GlobalRepository<DeveloperEntity>

    constructor(
        repository: GlobalRepository<DeveloperEntity>
    ) {
        this.repository = repository
    }

    async handle(input: inputCreateDeveloper): Promise<void> {
        await this.repository.insert({
            email: input.email,
            name: input.name
        })
    }

}