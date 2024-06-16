import { DeleteQueryInterface, InsertQueryInterface, SelectQueryInterface, UpdateQueryInterface } from "./query-interface"

export interface DatabaseConnectionInterface {
    query(query: string) : Promise<any[]>
    find(input: SelectQueryInterface) : Promise<any[]>
    insert(input: InsertQueryInterface) : Promise<any[]>
    update(input: UpdateQueryInterface) : Promise<any[]>
    delete(input: DeleteQueryInterface) : Promise<any[]>
    start(): any
    end(): Promise<void>
}