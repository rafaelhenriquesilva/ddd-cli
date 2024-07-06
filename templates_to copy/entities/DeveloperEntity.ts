
import { DeveloperDTO } from '../dto/DeveloperDTO'
export class DeveloperEntity {

        private readonly _id: string
        private readonly _name: string
        private readonly _email: string
        private readonly _createdAt: Date
        private readonly _updatedAt: Date

        constructor(dto: DeveloperDTO) {
                this._id = dto.id
                this._name = dto.name
                this._email = dto.email
                this._createdAt = dto.createdAt
                this._updatedAt = dto.updatedAt
        }

        public get id(): string {
                return this._id
        }

        public get name(): string {
                return this._name
        }

        public get email(): string {
                return this._email
        }

        public get createdAt(): Date {
                return this._createdAt
        }

        public get updatedAt(): Date {
                return this._updatedAt
        }
        toJson(): DeveloperDTO {
                return {
                        id: this.id,
                        name: this.name,
                        email: this.email,
                        createdAt: this.createdAt,
                        updatedAt: this.updatedAt,
                }
        }
}