export interface IUpdateDeveloperUseCase {
    handle(input: inputUpdateDeveloper): Promise<void>
}

export interface inputUpdateDeveloper {
    id: string
    name: string
    email: string
}

