
import program from 'commander'
import { CLIParams, ICLIService, InputDatabaseCLI } from '../../domain/services/cli-service-interface'
import { DatabaseConnection } from '../../infra/database/database-connection'

function verifyString(value: any) {
  if (!value) {
    throw new Error('Invalid string!')
  }
  return value
}

export class CLIService implements ICLIService {
  async execute(): Promise<CLIParams> {

    program
      .option('-n, --dbname <string>', 'Name of Database', verifyString)

    program
      .option('-h, --dbhost <string>', 'Host of Database', verifyString)

    program
      .option('-p, --dbpass <string>', 'Password of database', verifyString)

    program
      .option('-u, --dbuser <string>', 'Password of database', verifyString)

    program
      .option('-s, --schema <string>', 'Schema of database', verifyString)

    program
      .option('-t, --table <string>', 'Table on Schema of database', verifyString)

    program.parse(process.argv)

    const options = program.opts()

    this.checkingRequiredFields(options)

    this.setDatabaseConfig({
      DB_NAME: options.dbname,
      DB_HOST: options.dbhost,
      DB_PASSWORD: options.dbpass,
      DB_USER: options.dbuser
    })

    return {
      schemaName: options.schema,
      tableName: options.table
    }
  }

  checkingRequiredFields(options: any) {
    const requiredKeys = [
      'dbname',
      'dbhost',
      'dbpass',
      'dbuser',
      'schema'
    ]

    const errors: string[] = []

    for (const key of requiredKeys) {
      if (!options[key]) {
        errors.push(`Argument ${key} is required!`)
      }
    }

    if(errors.length > 0) {
      throw new Error(errors.join('\n'))
    }
  }

  setDatabaseConfig(input: InputDatabaseCLI) {
    DatabaseConnection.dbConfig = {
      DB_HOST: input.DB_HOST,
      DB_NAME: input.DB_NAME,
      DB_PASSWORD: input.DB_PASSWORD,
      DB_PORT: 5432,
      DB_USER: input.DB_USER
    }
  }

}