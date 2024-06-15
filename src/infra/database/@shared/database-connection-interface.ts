export interface DatabaseConnectionInterface {
    query(query: string) : Promise<any[]>
    start(): any
    end(): Promise<void>
}