import { PeopleTemplateDTO } from "../../dto"

export class PeopleTemplateEntity {
  private readonly _id: number
  private _name: string
  private _age: number
  private _birthDate: Date | string
  private readonly _createdAt: Date
  private readonly _updatedAt: Date
    
  constructor(dto: PeopleTemplateDTO) {
    this._id = dto.id
    this._name = dto.name
    this._age = dto.age
    this._birthDate = dto.birthDate
    this._createdAt = dto.createdAt
    this._updatedAt = dto.updatedAt

    this.validateDate(this._birthDate)
  }

  validateDate(inputBirthDate: string | Date): void {
    // Verificação adicional para garantir que a data é válida
    if (typeof inputBirthDate === 'string' && isNaN(new Date(inputBirthDate).getTime())) {
      throw new Error(`Invalid date format: ${inputBirthDate}`)
    }
  }

  public get id(): number {
    return this._id
  }

  public get name(): string {
    return this._name
  }

  public set name(value: string) {
    this._name = value
  }

  public get age(): number {
    return this._age
  }

  public set age(value: number) {
    this._age = value
  }

  public get birthDate(): Date | string {
    return this._birthDate
  }

  public set birthDate(value: Date) {
    this._birthDate = value
  }

  public get createdAt(): Date {
    return this._createdAt
  }
    
  public get updatedAt(): Date {
    return this._updatedAt
  }

  toJson(): PeopleTemplateDTO {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      birthDate: this.birthDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

}