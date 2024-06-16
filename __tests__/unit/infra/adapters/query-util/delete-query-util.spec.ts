import {PostgresQueryAdapter} from '../../../../../src/infra/adapters/postgres-query-adapter'
describe('Delete Query Util Mehods', () =>  {

  it('create a delete query with where equal', () => {
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

  it('create a delete query with where not equal', () => {
    const query = PostgresQueryAdapter.delete({
      table: 'mockTable',
      where: [
        {
          name: 'name',
          equal: false,
          value: 'test'
        }
      ]
    })
    
    expect(query.includes('DELETE FROM mockTable')).toBe(true)
    expect(query.includes(`WHERE name != 'test'`)).toBe(true)
  })

  it('should throw error when trying to create an delete query with empty fields on where condition', () => {
    const invokeDelete = () => PostgresQueryAdapter.delete({
      table: 'mockTable',
      where: []
    })

    expect(invokeDelete).toThrow('DELETE query needs at least one field on where condition. Verify if the fields have correct values!')
  })

})