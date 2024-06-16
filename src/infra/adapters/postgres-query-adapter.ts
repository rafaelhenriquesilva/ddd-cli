import { DeleteQueryInterface, InsertQueryInterface, QueryField, SelectQueryInterface, UpdateQueryInterface } from "../database/@shared/query-interface"

export class PostgresQueryAdapter {
  static find(input: SelectQueryInterface): string {
    let query = 'SELECT '

    for (const field of input.fields) {
      query += `${field.name},`
    }

    query = this.removeWordOfString(query, ',', -1)

    query += ` FROM ${input.table} `

    query += this.createWhereCondition(input.where)

    return query
  }

  static insert(input: InsertQueryInterface): string {
    input.fields = input.fields.filter(field => field.value !== undefined && field.value !== null)

    if(input.fields.length === 0) {
      throw new Error('Insert query needs at least one field. Verify if the fields have correct values!')
    }

    let query = `INSERT INTO ${input.table} (`
    const fieldsName = input.fields.map((data) => data.name)

    const fieldsValue = input.fields.map((data) => this.formatQueryValue(data))


    for (const fieldName of fieldsName) {
      query += `${fieldName},`
    }

    query = this.removeWordOfString(query, ',', -1)

    query += `) VALUES (`

    for (const fieldValue of fieldsValue) {
      query += `${fieldValue},`
    }

    query = this.removeWordOfString(query, ',', -1)

    query += ') '

    if(input.retuning) {
      query += `RETURNING ${input.retuning.name}`
    }

    return query
  }

  static update(input: UpdateQueryInterface): string {
    input.fields = input.fields.filter(field => field.value !== undefined && field.value !== null)
    
    if(input.fields.length === 0) {
      throw new Error('UPDATE query needs at least one field. Verify if the fields have correct values!')
    }

    input.where = input.where.filter(field => field.value !== undefined && field.value !== null)

    if(input.where.length === 0) {
      throw new Error('UPDATE query needs at least one field on where condition. Verify if the fields have correct values!')
    }

    let query = `UPDATE ${input.table} SET `


    for (const field of input.fields) {
      const value = this.formatQueryValue(field)
      query += `${field.name} = ${value},`
    }

    query = this.removeWordOfString(query, ',', -1)

    query += this.createWhereCondition(input.where)

    return query
  }

  static delete(input: DeleteQueryInterface): string {
    input.where = input.where.filter(field => field.value !== undefined && field.value !== null)
    if(input.where.length === 0) {
      throw new Error('DELETE query needs at least one field on where condition. Verify if the fields have correct values!')
    }

    let query = `DELETE FROM ${input.table} `

    query += this.createWhereCondition(input.where)

    return query
  }


  static formatQueryValue(field: QueryField): string {
    const value = field.value && typeof field.value === 'string' ? `'${field.value}'` : `${field.value}`
    return value
  }

  static removeWordOfString(query: string, word: string, spaces: number) {
    return query.slice(spaces) === word ? query.slice(0, spaces) : query
  }

  static createWhereCondition(fields?: QueryField[]): string {
    let whereCondition = ''
    if (fields && fields.length > 0) {
      whereCondition += ' WHERE '
  
      for (const field of fields) {
        const value = this.formatQueryValue(field)
        whereCondition += `${field.name} = ${value} AND `
      }
  
      whereCondition = this.removeWordOfString(whereCondition, 'AND ', -4)
    }
    return whereCondition
  }
}