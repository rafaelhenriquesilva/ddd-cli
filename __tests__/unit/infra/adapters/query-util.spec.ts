import {PostgresQueryAdapter} from '../../../../src/infra/adapters/postgres-query-adapter'
describe('Query Util Mehods', () =>  {
  it('create a select query any where', () => {
    const query = PostgresQueryAdapter.find({
      fields: [{
        name: 'field1'
      },
      {
        name: 'field2'
      },
      {
        name: 'field3'
      }],
      table: 'mockTable'
    })

    expect(query.includes('SELECT field1,field2,field3 FROM mockTable')).toBe(true)
    expect(query.includes('WHERE')).toBe(false)
  })

  it('create a select query with where', () => {
    const query = PostgresQueryAdapter.find({
      fields: [{
        name: 'field1'
      },
      {
        name: 'field2'
      },
      {
        name: 'field3'
      }],
      table: 'mockTable',
      where: [
        {
          name: 'field1',
          value: "test"
        },
        {
          name: 'field2',
          value: true
        },
        {
          name: 'field3',
          value: 10
        }
      ]
    })

    expect(query.includes('SELECT field1,field2,field3 FROM mockTable')).toBe(true)
    expect(query.includes('WHERE')).toBe(true)
    expect(query.includes(`field1 = 'test' AND`)).toBe(true)
    expect(query.includes('field2 = true AND')).toBe(true)
    expect(query.includes('field3 = 10')).toBe(true)
    expect(query.substring(0,-3) !== 'AND').toBe(true)
  })

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

  it('create a update query', () => {
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

  it('should throw error when trying to create an update query with empty fields', () => {
    const invokeUpdate = () => PostgresQueryAdapter.update({
      fields: [],
      table: 'mockTable',
      where: [
        {
          name: 'id',
          value: 1
        }
      ]
    })

    expect(invokeUpdate).toThrow('UPDATE query needs at least one field. Verify if the fields have correct values!')
  })

  it('should throw error when trying to create an update query with undefined values fields', () => {
    const invokeUpdate = () => PostgresQueryAdapter.update({
      fields: [{
        name: 'field1',
        value: undefined
      }],
      table: 'mockTable',
      where: [
        {
          name: 'id',
          value: 1
        }
      ]
    })

    expect(invokeUpdate).toThrow('UPDATE query needs at least one field. Verify if the fields have correct values!')
  })
  

  it('should throw error when trying to create an update query with empty fields on where condition', () => {
    const invokeUpdate = () => PostgresQueryAdapter.update({
      fields: [{
        name: 'field1',
        value: 10
      }],
      table: 'mockTable',
      where: []
    })

    expect(invokeUpdate).toThrow('UPDATE query needs at least one field on where condition. Verify if the fields have correct values!')
  })

  it('should throw error when trying to create an update query with fields with undefined value on where condition', () => {
    const invokeUpdate = () => PostgresQueryAdapter.update({
      fields: [{
        name: 'field1',
        value: 10
      }],
      table: 'mockTable',
      where: [{
        name: 'test',
        value: undefined
      }]
    })

    expect(invokeUpdate).toThrow('UPDATE query needs at least one field on where condition. Verify if the fields have correct values!')
  })

  it('create a delete query', () => {
    const query = PostgresQueryAdapter.delete({
      table: 'mockTable',
      where: [
        {
          name: 'name',
          value: 'test'
        }
      ]
    })
    
    expect(query.includes('DELETE FROM mockTable')).toBe(true)
    expect(query.includes(`WHERE name = 'test'`)).toBe(true)
  })

  it('should throw error when trying to create an delete query with empty fields on where condition', () => {
    const invokeDelete = () => PostgresQueryAdapter.delete({
      table: 'mockTable',
      where: []
    })

    expect(invokeDelete).toThrow('DELETE query needs at least one field on where condition. Verify if the fields have correct values!')
  })

})