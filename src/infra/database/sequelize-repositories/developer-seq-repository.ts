import { Developer } from '../sequelize-models/Developer-model'
import { GlobalRepository } from '../../../domain/repositories/@shared/repository-global-interface'

export class DeveloperSeqRepository implements GlobalRepository<Developer> {

  async findById(id: string | number): Promise<Developer[]> {
    const data = await Developer.findByPk(id)

    if (!data) {
      return []
    } else {
      return [data]
    }
  }

  async insert(input: any): Promise<Partial<Developer>[]> {
    const developer = await Developer.create(input)
    return [developer.toJSON()]
  }
  async listAll(): Promise<Developer[]> {
    return Developer.findAll()
  }

  async deleteById(id: string): Promise<void> {
    await Developer.destroy({ where: { id } })
  }

  async update(input: Partial<Developer>): Promise<void> {
    if (!input.id) {
      throw new Error('ID is required for update')
    }
    await Developer.update(input, { where: { id: input.id } })
  }
}
