import { InformationSchemaTableColumnDTO } from "../../domain/dto"
import { PostgresStringConverter } from "../converters/postgres-string-converter"

export class StringUtil {
  static capitalizeFirstLetter(str: string): string {
    if (!str) return str
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  static toCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
  }

  static removeQuotesAndCommas = (obj: { [key: string]: string }): string => {
    let str = JSON.stringify(obj, null, 2) 
    str = str.replace(/['",]/g, '') 
    return str
  }

  static convertPostgresColumnsToTsTypes = (columns: InformationSchemaTableColumnDTO[]): { [key: string]: string } => {
    const tsTypes: { [key: string]: string } = {}
    columns.forEach(column => {
      const camelCaseColumnName = StringUtil.toCamelCase(column.columnName)
      tsTypes[camelCaseColumnName] = PostgresStringConverter.getTsType(column.dataType)
    })
    return tsTypes
  }

  static getTsType(pgType: string): string {
    return PostgresStringConverter.pgToTsTypeMap[pgType] || 'any'
  }

}