//import 'reflect-metadata';
import { Sequelize } from 'sequelize-typescript'
// import { readdirSync } from 'fs'
// import { resolve } from 'path'
import { Developer } from '../sequelize-models/Developer-model'

// Caminho para a pasta de modelos
//const modelsPath = resolve(__dirname, '../sequelize-models');

// Lista de todos os arquivos na pasta de modelos
// const modelFiles = readdirSync(modelsPath);

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'rafael.candido',
  password: process.env.DB_PASSWORD || '1234test',
  database: process.env.DB_NAME || 'playground',
  models: [Developer]
    
    
  // modelFiles.map((file) => {
  //     const model = require(resolve(modelsPath, file));
  //     return model.default || model; // Suporte para `export default` e `module.exports`
  // })
})

export default sequelize
