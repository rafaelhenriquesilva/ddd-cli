export interface SelectQueryInterface {
    table: string
    fields: QueryField[]
    where?: QueryField[]
}

export interface DeleteQueryInterface {
    table: string
    where: QueryField[]
}

export interface UpdateQueryInterface {
    table: string
    fields: QueryField[]
    where: QueryField[]
}

export interface InsertQueryInterface {
    table: string
    fields: QueryField[]
    retuning?: QueryField
}

export interface QueryField {
    name: string
    value?: string | number | boolean | Date
}