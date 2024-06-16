import {PostgresQueryAdapter} from '../../../../../src/infra/adapters/postgres-query-adapter'
describe('Insert Query Util Mehods', () =>  {
  

  it('create a insert query any returning', () => {
    const query = PostgresQueryAdapter.insert({
      fields: [{
        name: 'field1',
        value: 10
      },
      {
        name: 'field2',
        value: 'test'
      },
      {
        name: 'field3',
        value: true
      }],
      table: 'mockTable'
    })

    expect(query.includes('INSERT INTO mockTable')).toBe(true)
    expect(query.includes('(field1,field2,field3)')).toBe(true)
    expect(query.includes(`VALUES (10,'test',true)`)).toBe(true)
    expect(query.includes(`RETURNING`)).toBe(false)
  })

  it('create a insert query with returning', () => {
    const query = PostgresQueryAdapter.insert({
      fields: [{
        name: 'field1',
        value: 10
      },
      {
        name: 'field2',
        value: 'test'
      },
      {
        name: 'field3',
        value: true
      }],
      table: 'mockTable',
      retuning: {
        name: 'id'
      }
    })

    expect(query.includes('INSERT INTO mockTable')).toBe(true)
    expect(query.includes('(field1,field2,field3)')).toBe(true)
    expect(query.includes(`VALUES (10,'test',true)`)).toBe(true)
    expect(query.includes(`RETURNING id`)).toBe(true)
  })

  it('should throw error when trying to create an insert query with empty fields', () => {
    const invokeInsert = () => PostgresQueryAdapter.insert({
      fields: [],
      table: 'mockTable'
    })

    expect(invokeInsert).toThrow('Insert query needs at least one field. Verify if the fields have correct values!')
  })

  it('should throw error when trying to create an insert query with undefined values on fields', () => {
    const invokeInsert = () => PostgresQueryAdapter.insert({
      fields: [{
        name: 'field3',
        value: undefined
      }],
      table: 'mockTable'
    })

    expect(invokeInsert).toThrow('Insert query needs at least one field. Verify if the fields have correct values!')
  })

  it('create a update query with where equal', () => {
    const query = PostgresQueryAdapter.update({
      fields: [{
        name: 'field1',
        value: 10
      },
      {
        name: 'field2',
        value: 'test'
      },
      {
        name: 'field3',
        value: true
      }],
      table: 'mockTable',
      where: [
        {
          name: 'id',
          value: 1
        }
      ]
    })
    expect(query.includes('UPDATE mockTable SET')).toBe(true)
    expect(query.includes('field1 = 10')).toBe(true)
    expect(query.includes(`field2 = 'test'`)).toBe(true)
    expect(query.includes(`field3 = true`)).toBe(true)
    expect(query.includes(`WHERE id = 1`)).toBe(true)
  })

})