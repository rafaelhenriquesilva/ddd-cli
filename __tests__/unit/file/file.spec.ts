import fs from'fs'
import path from 'path'
import { InformationSchemaRepository } from '../../../src/infra/repositories';
import { InformationSchemaTableColumnDTO } from '../../../src/domain/dto';

type ColumnInfo = {
    columnName: string;
    columnDefault: string | null;
    isNullable: string;
    dataType: string;
};

const pathFile = __dirname + './../../../'
const generateFolder = (folderName: string) => {
    const dir = path.join(pathFile,  folderName);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        console.log(`Folder '${folderName}' created.`);
    } else {
        console.log(`Folder '${folderName}' already exists.`);
    }
};

const generateFile = (folderName: string, filename: string, dto_template: string) => {
    const filePath = path.join(pathFile, folderName, filename);
    fs.writeFile(filePath, dto_template, (err: any) => {
        if (err) {
            console.error(`Error writing file '${filename}':`, err);
        }
    });
};

const createDTOTemplate  = (className: string, fields: string) => {
    return `
export interface ${className}DTO 
${fields}
`
} 

const capitalizeFirstLetter = (str: string): string => {
    if (!str) return str; // Verifica se a string não está vazia
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const pgToTsTypeMap: { [key: string]: string } = {
    'smallint': 'number',
    'integer': 'number',
    'bigint': 'number',
    'decimal': 'number',
    'numeric': 'number',
    'real': 'number',
    'double precision': 'number',
    'smallserial': 'number',
    'serial': 'number',
    'bigserial': 'number',
    'money': 'string',
    'character': 'string',
    'character varying': 'string',
    'text': 'string',
    'bytea': 'Buffer',
    'date': 'string',
    'time without time zone': 'string',
    'time with time zone': 'string',
    'timestamp without time zone': 'string',
    'timestamp with time zone': 'string',
    'interval': 'string',
    'boolean': 'boolean',
    'uuid': 'string',
    'json': 'any',
    'jsonb': 'any',
    'xml': 'string',
    'point': 'string',
    'line': 'string',
    'lseg': 'string',
    'box': 'string',
    'path': 'string',
    'polygon': 'string',
    'circle': 'string',
    'cidr': 'string',
    'inet': 'string',
    'macaddr': 'string',
    'bit': 'string',
    'bit varying': 'string',
    'tsquery': 'string',
    'tsvector': 'string',
    'int4range': 'string',
    'int8range': 'string',
    'numrange': 'string',
    'tsrange': 'string',
    'tstzrange': 'string',
    'daterange': 'string'
};

const toCamelCase = (str: string): string => {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

const getTsType = (pgType: string): string => {
    return pgToTsTypeMap[pgType] || 'any';
};

const convertColumnsToTsTypes = (columns: ColumnInfo[]): { [key: string]: string } => {
    const tsTypes: { [key: string]: string } = {};
    columns.forEach(column => {
        const camelCaseColumnName = toCamelCase(column.columnName);
        tsTypes[camelCaseColumnName] = getTsType(column.dataType);
    });
    return tsTypes;
};

const removeQuotesAndCommas = (obj: { [key: string]: string }): string => {
    let str = JSON.stringify(obj, null, 2); // Converte o objeto em string formatada
    str = str.replace(/['",]/g, ''); // Remove todos os apóstrofos e vírgulas
    return str;
};


const createDTOFile = async (folder:string, className: string, DTOTemplate: string) => {
    await generateFolder(folder);
    await generateFile(folder, `${className}DTO.ts`, DTOTemplate);
}


describe('Generate a file', () => {
    let repository: InformationSchemaRepository
    const schemaName: string = 'public'
    beforeAll(async() => {
        repository = new InformationSchemaRepository()
      })
    it('Call Information Schema And create file by schema', async () => {
        const tableName = 'all_data_types'
        const columns: InformationSchemaTableColumnDTO[] = await repository.findColumnsByNames(tableName, schemaName)
        const tsTypes = removeQuotesAndCommas(convertColumnsToTsTypes(columns));
        const className = capitalizeFirstLetter(toCamelCase(tableName))
        const DTOTemplate = createDTOTemplate(className, tsTypes)

        await createDTOFile('dto', className, DTOTemplate)

        expect(true).toBe(true)
    })
})