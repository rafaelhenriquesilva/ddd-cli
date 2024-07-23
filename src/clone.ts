import { FileUtil } from './infra/util/file-util';


export const cloneDefaultFiles = async () => {
    const fileUtil = new FileUtil(__dirname)
    // Clone Query Interface
    await fileUtil.cloneFile(
        '../src/infra/database/@shared',
        '../new-project/src/infra/database/@shared',
        'query-interface.ts'
    )
    // Clone Postgres Query Adapter
    await fileUtil.cloneFile(
        '../src/infra/adapters',
        '../new-project/src/infra/adapters',
        'postgres-query-adapter.ts'
    )

     // Clone Postgres Adapter
     await fileUtil.cloneFile(
        '../src/infra/database/postgres',
        '../new-project/src/infra/database/postgres',
        'postgres-adapter.ts'
    )

    // Clone Database Connection Interface
    await fileUtil.cloneFile(
        '../src/infra/database/@shared',
        '../new-project/src/infra/database/@shared',
        'database-connection-interface.ts'
    )

    // Clone Database Connection
    await fileUtil.cloneFile(
        '../src/infra/database',
        '../new-project/src/infra/database',
        'database-connection.ts'
    )

    await fileUtil.cloneFile(
        '../',
        '../new-project/',
        '.eslintrc.json'
    )

    await fileUtil.cloneFile(
        '../',
        '../new-project/',
        'jest.config.js'
    )

    await fileUtil.cloneFile(
        '../',
        '../new-project/',
        'jest.setup.ts'
    )

    await fileUtil.cloneFile(
        '../',
        '../new-project/',
        'package.json'
    )

    await fileUtil.cloneFile(
        '../',
        '../new-project/',
        '.gitignore'
    )

    await fileUtil.cloneFile(
        '../',
        '../new-project/',
        'tsconfig.json'
    )

    await fileUtil.cloneFile(
        '../',
        '../new-project/',
        '.env'
    )

    
}