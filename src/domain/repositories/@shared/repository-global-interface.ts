export interface GlobalRepository<T> {
    listAll(): Promise<T[]>
    findById(id:string | number): Promise<T[]>
    insert(input: Partial<T>): Promise<void>
    update(input: Partial<T>): Promise<void>
    deleteById(id: string): Promise<void>
}