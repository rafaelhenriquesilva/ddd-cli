import { DeveloperModel } from '../sequelize-models/Developer-model'
import { GlobalRepository } from '../../../domain/repositories/@shared/repository-global-interface'

export class DeveloperSeqRepository implements GlobalRepository<DeveloperModel> {

  async findById(id: string | number): Promise<DeveloperModel[]> {
    const data = await DeveloperModel.findByPk(id)

    if (!data) {
      return []
    } else {
      return [data]
    }
  }

  async insert(input: any): Promise<Partial<DeveloperModel>[]> {
    const developer = await DeveloperModel.create(input)
    return [developer.toJSON()]
  }
  async listAll(): Promise<DeveloperModel[]> {
    return DeveloperModel.findAll()
  }

  async deleteById(id: string): Promise<void> {
    await DeveloperModel.destroy({ where: { id } })
  }

  async update(input: Partial<DeveloperModel>): Promise<void> {
    if (!input.id) {
      throw new Error('ID is required for update')
    }
    await DeveloperModel.update(input, { where: { id: input.id } })
  }
}
