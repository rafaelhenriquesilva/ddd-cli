export interface InformationSchemaTableDTO {
    tableName: string
}

export interface InformationSchemaTableColumnDTO {
    columnName: string
    dataType: string
    isNullable: string
    columnDefault: string
}