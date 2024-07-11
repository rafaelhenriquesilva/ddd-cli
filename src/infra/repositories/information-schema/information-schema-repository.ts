import { InformationSchemaTableDTO, InformationSchemaTableColumnDTO } from '../../../domain/dto'
import { InformationSchemaRepositoryInterface } from '../../../domain/repositories'
import { DatabaseConnection } from '../../database/database-connection'

export class InformationSchemaRepository implements InformationSchemaRepositoryInterface {
  connection: DatabaseConnection
  constructor() {
    this.connection = DatabaseConnection.getInstance()
  }

  async findTablesBySchemaName(schemaName: string): Promise<InformationSchemaTableDTO[]> {
    const SchemaModel = await this.connection.find({
      table: 'information_schema.tables',
      fields: [
        { name: '*' }
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

  async findColumnsByNames(schemaName: string, tableName?: string,): Promise<InformationSchemaTableColumnDTO[]> {
    const whereList = [
      {
        name: 'table_schema',
        value: schemaName
      }
    ]

    if (tableName) {
      whereList.push({
        name: 'table_name',
        value: tableName
      })
    }
    const TableModel = await this.connection.find({
      table: 'information_schema.columns',
      fields: [
        { name: '*' }
      ],
      where: whereList
    })

    return TableModel.map(row => this.mappingRowToEntity(row))
  }

  private mappingRowToEntity(row: any): InformationSchemaTableColumnDTO {
    return {
      columnName: row.column_name,
      columnDefault: row.column_default,
      isNullable: row.is_nullable,
      dataType: row.data_type,
      tableName: row.table_name,
      schemaName: row.table_schema
    }
  }

}