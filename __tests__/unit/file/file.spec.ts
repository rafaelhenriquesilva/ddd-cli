import fs from'fs'
import path from 'path'
import { InformationSchemaRepository } from '../../../src/infra/repositories'
import { StringUtil } from '../../../src/infra/util/string-util'
import { InformationSchemaTableColumnDTO } from '../../../src/domain/dto'

const pathFile = __dirname + './../../../'
const generateFolder = (folderName: string) => {
  const dir = path.join(pathFile,  folderName)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
    console.log(`Folder '${folderName}' created.`)
  } else {
    console.log(`Folder '${folderName}' already exists.`)
  }
}

const generateFile = (folderName: string, filename: string, dto_template: string) => {
  const filePath = path.join(pathFile, folderName, filename)
  fs.writeFile(filePath, dto_template, (err: any) => {
    if (err) {
      console.error(`Error writing file '${filename}':`, err)
    }
  })
}


const createDTOTemplateByColumns  = (className: string, columns: InformationSchemaTableColumnDTO[]): string => {
  let template = `
export interface ${className}DTO 
{
`
  for (const column of columns) {
    const camelCaseColumnName = StringUtil.toCamelCase(column.columnName)
    const dataTypeTS = StringUtil.getTsType(column.dataType)

    template += `${camelCaseColumnName}: ${dataTypeTS} \n`
  }

  template += '}'
  return template
}

const createDTOFile = async(folder:string, detail: TableDetail) => {
  await generateFolder(folder)
  await generateFile(folder, `${detail.className}DTO.ts`, detail.DTOTemplate)
}

export interface TableDetail {
    tableName: string
    columns: InformationSchemaTableColumnDTO[]
    tsTypes: string
    className: string
    DTOTemplate: string
}

describe('Generate a file', () => {
  let repository: InformationSchemaRepository
  const schemaName: string = 'public'
  beforeAll(async() => {
    repository = new InformationSchemaRepository()
  })
  it('Call Information Schema And create file by schema', async() => {
    const tableName = 'all_data_types'
    const columns: InformationSchemaTableColumnDTO[] = await repository.findColumnsByNames(tableName, schemaName)
    const className = StringUtil.capitalizeFirstLetter(
        StringUtil.toCamelCase(tableName)
    )
    const tableDetail: TableDetail = {
        tableName,
        columns,
        className,
        tsTypes: StringUtil.removeQuotesAndCommas(
            StringUtil.convertColumnsToTsTypes(columns)
        ),
        DTOTemplate: createDTOTemplateByColumns(className, columns)
    }

    //const listFields = stringToObjArray(tsTypes)
        
    await createDTOFile('dto', tableDetail)

    expect(true).toBe(true)
  })
})