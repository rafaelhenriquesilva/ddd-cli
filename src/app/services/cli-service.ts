
import program from 'commander'
import { CLIParams, ICLIService } from '../../domain/services/cli-service-interface'

function verifyString(value: any) {
  if (!value) {
    throw new Error('Invalid string!')
  }
  return value
}

export class CLIService implements ICLIService {
  async execute(): Promise<CLIParams> {
    program
      .option('-s, --schema <string>', 'string argument', verifyString)
  
    program
      .option('-t, --table <string>', 'string argument', verifyString)
  
    program.parse(process.argv)
  
    const options = program.opts()
  
    if (!options.schema) {
      throw new Error('Argument schema is required!')
    }
  
    console.log(`schema: ${options.schema}`)
    if (options.table !== undefined) console.log(`table: ${options.table}`)
  
  
  
    return {
      schemaName: options.schema,
      tableName: options.table
    }
  }
  
}