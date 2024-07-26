# IniciaPraEu CLI 🚀

Automatize a criação de entidades, Data Objects e casos de uso padrão (CRUD) com base nas tabelas do PostgreSQL utilizando Domain-Driven Design (DDD).

## Descrição 📖

No desenvolvimento de software utilizando **DDD**, criamos soluções escaláveis e orientadas a interfaces. No entanto, ao criar novas tabelas, enfrentamos a tarefa repetitiva de construir manualmente entidades, Data Objects e casos de uso padrão (CRUD). O **IniciaPraEu CLI** automatiza essa camada, gerando-a automaticamente com base nas tabelas do PostgreSQL.

## Funcionalidades 🔧

A CLI cria as seguintes classes para cada tabela:

- DTO
- Entity
- Teste da Entity
- Repositório com métodos: ListAll, FindById, Update, Create e Delete
- Teste do Repositório
- UseCases CRUD
- Teste dos UseCases

## Regras para a criação das tabelas 📋

- Toda tabela deve possuir um campo `id`.
- Nomes dos campos devem ser minúsculos e separados por underline, por exemplo:
  - `id_user`
  - `age_user`
  - `work_local`
- Toda tabela precisa dos campos de datas: `created_at` e `updated_at`.

## Parâmetros disponíveis para a API 🛠️

- `--schema` (required): nome do schema referente ao banco de dados
- `--dbname` (required): nome do banco de dados
- `--dbhost` (required): host do banco de dados
- `--dbpass` (required): senha do banco de dados
- `--dbuser` (required): usuário do banco de dados
- `--table` (optional): nome da tabela do banco de dados, caso não queira todas do schema

## Instalação 🌟

### Instalação Global

Para tornar o CLI global e executar, utilize os seguintes comando:

```bash
npm install -g .

inicia-pra-eu --help

inicia-pra-eu --schema public --dbname database_name --dbhost database_host --dbpass database_password --dbuser "database_username"