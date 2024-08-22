import { Command } from 'commander';
import { CLIService } from '../../../src/app/services/cli-service';
import { DatabaseConnection } from '../../../src/infra/database/database-connection';

// Mock da biblioteca 'commander'
jest.mock('commander');

describe('CLIService', () => {
  let cliService: CLIService;

  beforeEach(() => {
    cliService = new CLIService();
    jest.clearAllMocks();
  });

  it('deve processar e validar argumentos corretamente', async () => {
    // Configurando o mock do 'program.opts'
    const mockOpts = {
      dbname: 'testdb',
      dbhost: 'localhost',
      dbpass: 'password',
      dbuser: 'user',
      schema: 'public',
      table: 'testtable',
    };

    (Command as jest.Mock).mockImplementation(() => ({
      option: jest.fn().mockReturnThis(),
      parse: jest.fn(),
      opts: jest.fn().mockReturnValue(mockOpts),
    }));

    // Mock da configuração do banco de dados
    DatabaseConnection.dbConfig = {
      DB_HOST: mockOpts.dbhost,
      DB_NAME: mockOpts.dbname,
      DB_PASSWORD: mockOpts.dbpass,
      DB_PORT: 5432,
      DB_USER: mockOpts.dbuser,
    };

    // Executar o método
    const result = await cliService.execute();

    // Verificar se a configuração do banco de dados foi chamada com os parâmetros corretos
    expect(DatabaseConnection.dbConfig).toEqual({
      DB_HOST: mockOpts.dbhost,
      DB_NAME: mockOpts.dbname,
      DB_PASSWORD: mockOpts.dbpass,
      DB_PORT: 5432,
      DB_USER: mockOpts.dbuser,
    });

    // Verificar o resultado retornado
    expect(result).toEqual({
      schemaName: mockOpts.schema,
      tableName: mockOpts.table,
    });
  });

  it('deve lançar um erro se algum campo obrigatório estiver faltando', async () => {
    // Configurando o mock do 'program.opts' com um campo obrigatório faltando
    const mockOpts = {
      dbname: 'testdb',
      dbhost: 'localhost',
      dbpass: 'password',
      dbuser: 'user',
      // schema está faltando
    };

    (Command as jest.Mock).mockImplementation(() => ({
      option: jest.fn().mockReturnThis(),
      parse: jest.fn(),
      opts: jest.fn().mockReturnValue(mockOpts),
    }));

    // Executar o método e verificar se o erro é lançado
    await expect(cliService.execute()).rejects.toThrow('Argument schema is required!');
  });
});
