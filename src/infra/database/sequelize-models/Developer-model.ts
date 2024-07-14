import { Table, Column, Model, PrimaryKey, IsUUID, Default, DataType } from 'sequelize-typescript'

@Table({ tableName: 'developer', timestamps: false })
export class Developer extends Model<Developer> {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column
    id!: string

  @Column
    name!: string

  @Column
    email!: string

  @Default(DataType.NOW)
  @Column
    created_at!: Date

  @Default(DataType.NOW)
  @Column
    updated_at!: Date
}
