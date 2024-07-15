import 'reflect-metadata';
import { Sequelize, Model } from 'sequelize-typescript';
import { readdirSync } from 'fs';
import { resolve, extname } from 'path';
import {DeveloperModel } from '../sequelize-models'

// // Caminho para a pasta de modelos
// const modelsPath = resolve(__dirname, '../sequelize-models');

// // Lista de todos os arquivos na pasta de modelos
// const modelFiles = readdirSync(modelsPath).filter((file) => {
//   return extname(file) === '.ts' || extname(file) === '.js';
// });

// // Importa os modelos dinamicamente e filtra apenas aqueles que são classes de modelo
// const models = modelFiles.map((file) => {
//   const model = require(resolve(modelsPath, file));
//   return model.default || model;
// }).filter((model) => typeof model === 'function' && model.prototype instanceof Model);

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'rafael.candido',
  password: process.env.DB_PASSWORD || '1234test',
  database: process.env.DB_NAME || 'playground',
  models: [
    DeveloperModel
  ]
});

//sequelize.addModels(models);

export default sequelize;
