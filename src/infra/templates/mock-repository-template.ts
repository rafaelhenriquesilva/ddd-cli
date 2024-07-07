export class MockRepositoryTemplate {
  static render(): string {
    const template = `
export const repositoryMock = {
  listAll: jest.fn(),
  deleteById: jest.fn(),
  findById: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
}
        `
    return template
  }

}