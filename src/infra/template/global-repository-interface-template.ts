export class GlobalRepositoryInterfaceTemplate {
    static render(): string { 
        return `
            export interface GlobalRepositoryInterface<T> {
                listAll(): Promise<T[]>
                deleteById(id: string): Promise<void>
                findById(id: string): Promise<T[]>
                insert(input: Partial<T>):Promise<Partial<T[]>>
                update(input: Partial<T>): Promise<void>
            }
        `
    }
}