-- Cria a extensão uuid-ossp para gerar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cria a tabela developer, se não existir
CREATE TABLE IF NOT EXISTS developer (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cria a função para atualizar o campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Cria a trigger para atualizar os campos created_at e updated_at
CREATE TRIGGER update_developer_updated_at
BEFORE UPDATE ON developer
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
