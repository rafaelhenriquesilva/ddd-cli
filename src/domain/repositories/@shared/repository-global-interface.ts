export interface GlobalRepository<T> {
    listAll(): Promise<T[]>
    findById(id:string | number): Promise<T[]>
    insert(input: Partial<T>): Promise<Partial<T>[]>
    update(input: Partial<T>): Promise<void>
    deleteById(id: string | number): Promise<void>
}