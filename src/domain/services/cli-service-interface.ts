export interface CLIParams {
  schemaName: string
  tableName: string | undefined
}

export interface ICLIService {
  execute(): Promise<CLIParams>
}


export interface InputDatabaseCLI {
  DB_NAME: string
  DB_HOST: string
  DB_PASSWORD: string
  DB_USER: string
}

