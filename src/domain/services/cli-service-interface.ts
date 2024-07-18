export interface CLIParams {
  schemaName: string
  tableName: string | undefined
}

export interface ICLIService {
  execute(): Promise<CLIParams>
}


