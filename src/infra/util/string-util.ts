import { InformationSchemaTableColumnDTO } from "../../domain/dto"

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
      tsTypes[camelCaseColumnName] = StringUtil.getTsType(column.dataType)
    })
    return tsTypes
  }

  // TODO: Isolar isso no pg ADapter
  static pgToTsTypeMap: { [key: string]: string } = {
    'smallint': 'number',
    'integer': 'number',
    'bigint': 'number',
    'decimal': 'number',
    'numeric': 'number',
    'real': 'number',
    'double precision': 'number',
    'smallserial': 'number',
    'serial': 'number',
    'bigserial': 'number',
    'money': 'string',
    'character': 'string',
    'character varying': 'string',
    'text': 'string',
    'bytea': 'Buffer',
    'date': 'string',
    'time without time zone': 'Date',
    'time with time zone': 'Date',
    'timestamp without time zone': 'Date',
    'timestamp with time zone': 'Date',
    'interval': 'string',
    'boolean': 'boolean',
    'uuid': 'string',
    'json': 'any',
    'jsonb': 'any',
    'xml': 'string',
    'point': 'string',
    'line': 'string',
    'lseg': 'string',
    'box': 'string',
    'path': 'string',
    'polygon': 'string',
    'circle': 'string',
    'cidr': 'string',
    'inet': 'string',
    'macaddr': 'string',
    'bit': 'string',
    'bit varying': 'string',
    'tsquery': 'string',
    'tsvector': 'string',
    'int4range': 'string',
    'int8range': 'string',
    'numrange': 'string',
    'tsrange': 'string',
    'tstzrange': 'string',
    'daterange': 'string'
  }

  static getTsType(pgType: string): string {
    return StringUtil.pgToTsTypeMap[pgType] || 'any'
  }
}