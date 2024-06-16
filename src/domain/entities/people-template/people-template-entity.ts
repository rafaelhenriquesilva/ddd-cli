import { PeopleTemplateDTO } from "../../dto"

export class PeopleTemplateEntity {
    private readonly _id: number

    private _name: string

    private _age: number

    private _birthDate: Date

    constructor(dto: PeopleTemplateDTO) {
        this._id = dto.id
        this._name = dto.name
        this._age = dto.age
        this._birthDate = dto.birthDate
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
    public get birthDate(): Date {
        return this._birthDate
    }
    public set birthDate(value: Date) {
        this._birthDate = value
    }

    toJson(): PeopleTemplateDTO {
        return {
            id: this.id,
            name: this.name,
            age: this.age,
            birthDate: this.birthDate
        }
    }

}