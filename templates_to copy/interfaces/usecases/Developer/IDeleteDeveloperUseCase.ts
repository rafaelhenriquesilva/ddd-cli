export interface IDeleteDeveloperUseCase {
    handle(id: string): Promise<void>
}
