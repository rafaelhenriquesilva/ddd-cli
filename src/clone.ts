import { FileUtil } from './infra/util/file-util';

export const cloneDefaultFiles = async () => {
  const fileUtil = new FileUtil(process.cwd());

  const filesToClone = [
    { origin: 'src/infra/database/@shared', destiny: 'new-project/src/infra/database/@shared', filename: 'query-interface.ts' },
    { origin: 'src/infra/adapters', destiny: 'new-project/src/infra/adapters', filename: 'postgres-query-adapter.ts' },
    { origin: 'src/infra/database/postgres', destiny: 'new-project/src/infra/database/postgres', filename: 'postgres-adapter.ts' },
    { origin: 'src/infra/database/@shared', destiny: 'new-project/src/infra/database/@shared', filename: 'database-connection-interface.ts' },
    { origin: 'src/infra/database', destiny: 'new-project/src/infra/database', filename: 'database-connection.ts' },
    { origin: '.', destiny: 'new-project', filename: '.eslintrc.json' },
    { origin: '.', destiny: 'new-project', filename: 'jest.config.js' },
    { origin: '.', destiny: 'new-project', filename: 'jest.setup.ts' },
    { origin: '.', destiny: 'new-project', filename: 'package.json' },
    { origin: '.', destiny: 'new-project', filename: '.gitignore' },
    { origin: '.', destiny: 'new-project', filename: 'tsconfig.json' },
    { origin: '.', destiny: 'new-project', filename: '.env' }
  ];

  for (const file of filesToClone) {
    await fileUtil.generateFolder(file.destiny);
    await fileUtil.cloneFile(file.origin, file.destiny, file.filename);
  }
};
