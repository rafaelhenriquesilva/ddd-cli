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


-- Create the language_developer table
CREATE TABLE IF NOT EXISTS language_developer (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    developer_id UUID NOT NULL,
    language TEXT NOT NULL,
    experience_time INT NOT NULL, -- Time in months or years, as preferred
    level TEXT NOT NULL, -- e.g., 'Beginner', 'Intermediate', 'Advanced'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (developer_id) REFERENCES developer(id) ON DELETE CASCADE
);

-- Create the trigger to update the updated_at field in the language_developer table
CREATE TRIGGER update_language_developer_updated_at
BEFORE UPDATE ON language_developer
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
