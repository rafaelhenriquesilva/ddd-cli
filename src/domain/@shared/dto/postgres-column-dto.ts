export interface PostgresColumnDTO {
    columnName: string
    dataType: string
    isNullable: string
    columnDefault: string
    camelCaseColumnName:string
    dataTypeTS: string
    schema: string
    table: string
}