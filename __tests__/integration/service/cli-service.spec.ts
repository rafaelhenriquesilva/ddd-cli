import { CLIService } from '../../../src/app/services/cli-service';
import program from 'commander';
import { DatabaseConnection } from '../../../src/infra/database/database-connection';

jest.mock('commander', () => ({
  option: jest.fn().mockReturnThis(),
  parse: jest.fn(),
  opts: jest.fn()
}));

describe('CLIService', () => {
  let cliService: CLIService;

  beforeEach(() => {
    cliService = new CLIService();
    jest.clearAllMocks();
  });

  it('should correctly parse and return CLI parameters', async () => {
    (program.opts as jest.Mock).mockReturnValue({
      dbname: 'testDB',
      dbhost: 'localhost',
      dbpass: 'password',
      dbuser: 'user',
      schema: 'public',
      table: 'testTable'
    });

    const result = await cliService.execute();

    expect(result).toEqual({
      schemaName: 'public',
      tableName: 'testTable'
    });
  });

  it('should throw an error if required fields are missing', async () => {
    (program.opts as jest.Mock).mockReturnValue({
      dbname: 'testDB',
      dbhost: 'localhost',
      dbpass: 'password',
      dbuser: ''
    });

    await expect(cliService.execute()).rejects.toThrow('Argument dbuser is required!');
  });

  it('should set the database configuration correctly', async () => {
    (program.opts as jest.Mock).mockReturnValue({
      dbname: 'testDB',
      dbhost: 'localhost',
      dbpass: 'password',
      dbuser: 'user',
      schema: 'public',
      table: 'testTable'
    });

    await cliService.execute();

    expect(DatabaseConnection.dbConfig).toEqual({
      DB_HOST: 'localhost',
      DB_NAME: 'testDB',
      DB_PASSWORD: 'password',
      DB_PORT: 5432,
      DB_USER: 'user'
    });
  });

});
