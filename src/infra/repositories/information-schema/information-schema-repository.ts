import { InformationSchemaTableDTO, InformationSchemaTableColumnDTO } from '../../../domain/dto'
import {InformationSchemaRepositoryInterface} from '../../../domain/repositories'
import {DatabaseConnection} from '../../database/database-connection'

export class InformationSchemaRepository implements InformationSchemaRepositoryInterface {
  connection: DatabaseConnection
  constructor() {
    this.connection = DatabaseConnection.getInstance() 
  }

  async findTablesBySchemaName(schemaName: string): Promise<InformationSchemaTableDTO[]> {
    const SchemaModel = await this.connection.find({
      table: 'information_schema.tables',
      fields: [
        {name: '*' }
      ],
      where: [{
        name: 'table_schema',
        value: schemaName
      }]
    })

    return SchemaModel.map(row => {
      return {
        tableName: row.table_name
      }
    })
  }
    
  async findColumnsByNames(tableName: string, schemaName: string): Promise<InformationSchemaTableColumnDTO[]> {
    const TableModel = await this.connection.find({
      table: 'information_schema.columns',
      fields: [
        {name: '*' }
      ],
      where: [
        {
          name: 'table_name',
          value: tableName
        },
        {
          name: 'table_schema',
          value: schemaName
        }
      ]
    })

    return TableModel.map(row => {
      return {
        columnName: row.column_name,
        columnDefault: row.column_default,
        isNullable: row.is_nullable,
        dataType: row.data_type,
      }
    })
  }

}