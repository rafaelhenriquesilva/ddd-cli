import { DatabaseConnection } from '../../../src/infra/database/database-connection'
import {InformationSchemaRepository} from '../../../src/infra/repositories'
const table = `table_fake`

const createTable = () => {
  return `CREATE TABLE IF NOT EXISTS ${table} (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    birth_date DATE NOT NULL
  );`
}

const dropTable = () => {
  return `DROP TABLE ${table}`
}


describe('table fake: database actions', () => {
  let connection: DatabaseConnection
  let repository: InformationSchemaRepository
  const schemaName: string = 'public'
  beforeAll(async() => {
    connection = await DatabaseConnection.getInstance()
    await connection.query(createTable())
    repository = new InformationSchemaRepository()
  })


  
  it('SELECT Table name On Schema ', async() => {
    const result = await repository.findTablesBySchemaName(schemaName)
   
    expect(result.length > 0).toBe(true)
  })

  it('SELECT colums of ' + table, async() => {
    const result = await repository.findColumnsByNames(table, schemaName)
   
    expect(result.length === 4).toBe(true)
  })


  afterAll(async() => {
    await connection.query(dropTable())
  })
})