export interface ICreateDeveloperUseCase {
    handle(input: inputCreateDeveloper): Promise<void>
}

export interface inputCreateDeveloper {
    name: string
    email: string
}

