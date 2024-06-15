import {DatabaseConnection} from '../../../../src/infra/database/database-connection'

describe('Connection test', () => {
  let connection: DatabaseConnection
  beforeAll(() => {
    connection = DatabaseConnection.getInstance()
  })

  it('RUN QUERY IN DATABASE ', async() => {
    const result = await connection.query("SELECT 1 + 1 AS count")
    expect(result[0].count).toBe(2)
  })


  it('GET ERROR TO EXECUTE QUERY IN DATABASE ', async() => {
    expect(connection.query("SELECT 1 x 1 AS count")).rejects.toThrow()
  })
})