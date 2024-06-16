import { DatabaseConnection } from '../../../../src/infra/database/database-connection'

const table = `people_fake`

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


describe('Table people_fake: database actions', () => {
  let connection: DatabaseConnection
  let peopleId: any;
  beforeAll(async () => {
    connection = await DatabaseConnection.getInstance()
    await connection.query(createTable())
  })

  it('Insert ON people_fake Table ', async () => {
    const result = await connection.insert({
      fields: [
        { name: 'name', value: 'Test Faker 2' },
        { name: 'age', value: 10 },
        { name: 'birth_date', value: '1997-02-28'},
      ],
      table: `public.${table}`,
      retuning: {
        name: 'id'
      }
    })
    peopleId = result[0].id 
    expect(result[0].id).toBeDefined()
  })

  it('UPDATE ON people_fake Table ', async () => {
   await connection.update({
      fields: [
        { name: 'age', value: 20 },
      ],
      table: `public.${table}`,
      where: [{
        name: 'id',
        value: peopleId
      }]
    })
  })

  
  it('SELECT ON people_fake Table ', async () => {
    const result = await connection.find({
      fields: [
        { name: 'id' },
        { name: 'name' },
        { name: 'age' },
        { name: 'birth_date' },
      ],
      table: `public.${table}`,
      where: [
        {
          name: "id",
          value: peopleId
        } 
      ]
    })
   
    expect(result.length).toBe(1)
    expect(result[0].age).toBe(20)
  })

  it('DELETE ON people_fake Table ', async () => {
    await connection.delete({
      table: `public.${table}`,
      where: [{
        name: 'id',
        value: peopleId
      }]
    })
    
    const result = await connection.find({
      fields: [
        { name: 'id' },
        { name: 'name' },
        { name: 'age' },
        { name: 'birth_date' },
      ],
      table: `public.${table}`,
      where: [
        {
          name: "id",
          value: peopleId
        } 
      ]
    })
   
    expect(result.length).toBe(0)
    
  })

  afterAll(async () => {
    await connection.query(dropTable())
    await connection.end()
  })
})