import { FileUtil } from './infra/util/file-util';


const cloneFiles = async () => {
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
}

cloneFiles()