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
----------------------------------------------------------


DROP TABLE IF EXISTS GAMIFICATION.category_company;
DROP TABLE IF EXISTS GAMIFICATION.company;

DROP TABLE IF EXISTS GAMIFICATION.platform_user;
DROP TABLE IF EXISTS GAMIFICATION.assessment_rule;
DROP TABLE IF EXISTS GAMIFICATION.assessment;
DROP TABLE IF EXISTS GAMIFICATION.skill;
DROP TABLE IF EXISTS GAMIFICATION.category_skill;
DROP TABLE IF EXISTS GAMIFICATION.rule_experience;
DROP TABLE IF EXISTS GAMIFICATION.badge;
DROP TABLE IF EXISTS GAMIFICATION.rule_badge_unlock;
DROP TABLE IF EXISTS GAMIFICATION.user_experience;
DROP TABLE IF EXISTS GAMIFICATION.level_rule;
DROP TABLE IF EXISTS GAMIFICATION.category_task;
DROP TABLE IF EXISTS GAMIFICATION.task;
DROP TABLE IF EXISTS GAMIFICATION.task_user;
DROP TABLE IF EXISTS GAMIFICATION.task_rule;
DROP TABLE IF EXISTS GAMIFICATION.badge_user;
DROP TABLE IF EXISTS GAMIFICATION.category_level;
DROP TABLE IF EXISTS GAMIFICATION.category_event;


-- Certifique-se de que a extensão uuid-ossp está habilitada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE GAMIFICATION.category_company (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(120) NOT NULL,
    is_active BOOLEAN NOT NULL
);

CREATE TABLE GAMIFICATION.company (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(120) NOT NULL,
    description VARCHAR(480) NOT NULL,
    id_category UUID NOT NULL,
    is_active BOOLEAN NOT NULL,
    FOREIGN KEY (id_category) REFERENCES GAMIFICATION.category_company(id)
);

CREATE TABLE GAMIFICATION.platform_user (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    id_company UUID NOT NULL,
    id_external VARCHAR(240) NOT NULL,
    is_active BOOLEAN NOT NULL,
    total_experience FLOAT NOT NULL,
    FOREIGN KEY (id_company) REFERENCES GAMIFICATION.company(id)
);

CREATE TABLE GAMIFICATION.category_skill (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(60) NOT NULL
);

CREATE TABLE GAMIFICATION.assessment_rule (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    id_company UUID NOT NULL,
    max_value INTEGER NOT NULL,
    min_value INTEGER NOT NULL,
    id_category_event UUID NOT NULL,
    FOREIGN KEY (id_company) REFERENCES GAMIFICATION.company(id)
);

CREATE TABLE GAMIFICATION.assessment (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    user_voted UUID NOT NULL,
    user_analyzed UUID NOT NULL,
    id_assessment_rule UUID NOT NULL,
    value INTEGER NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (user_voted) REFERENCES GAMIFICATION.platform_user(id),
    FOREIGN KEY (user_analyzed) REFERENCES GAMIFICATION.platform_user(id),
    FOREIGN KEY (id_assessment_rule) REFERENCES GAMIFICATION.assessment_rule(id)
);


CREATE TABLE GAMIFICATION.skill (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    description VARCHAR(120) NOT NULL,
    id_category_skill UUID NOT NULL,
    id_user UUID NOT NULL,
    is_active BOOLEAN NOT NULL,
    id_assessment_rule UUID NOT NULL DEFAULT uuid_generate_v4(),
    FOREIGN KEY (id_category_skill) REFERENCES GAMIFICATION.category_skill(id),
    FOREIGN KEY (id_user) REFERENCES GAMIFICATION.platform_user(id),
    FOREIGN KEY (id_assessment_rule) REFERENCES GAMIFICATION.assessment_rule(id)
);

CREATE TABLE GAMIFICATION.rule_experience (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    experience FLOAT NOT NULL,
    name VARCHAR(120) NOT NULL,
    description VARCHAR(1080) NOT NULL,
    is_active BOOLEAN NOT NULL
);

CREATE TABLE GAMIFICATION.badge (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(60) NOT NULL,
    description VARCHAR(1080) NOT NULL,
    id_company UUID NOT NULL,
    is_active BOOLEAN NOT NULL,
    FOREIGN KEY (id_company) REFERENCES GAMIFICATION.company(id)
);

CREATE TABLE GAMIFICATION.rule_badge_unlock (
    id_rule_experience UUID NOT NULL,
    id_badge UUID NOT NULL,
    FOREIGN KEY (id_rule_experience) REFERENCES GAMIFICATION.rule_experience(id),
    FOREIGN KEY (id_badge) REFERENCES GAMIFICATION.badge(id)
);

CREATE TABLE GAMIFICATION.category_level (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(20) NOT NULL
);

CREATE TABLE GAMIFICATION.user_experience (
    user_id UUID NOT NULL,
    total FLOAT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES GAMIFICATION.platform_user(id)
);

CREATE TABLE GAMIFICATION.level_rule (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    id_company UUID NOT NULL,
    min_experience DECIMAL NOT NULL,
    max_experience INTEGER NOT NULL,
    id_category_level UUID NOT NULL,
    FOREIGN KEY (id_company) REFERENCES GAMIFICATION.company(id),
    FOREIGN KEY (id_category_level) REFERENCES GAMIFICATION.category_level(id)
);

CREATE TABLE GAMIFICATION.category_task (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(120) NOT NULL,
    description VARCHAR(1080) NOT NULL,
    is_active BOOLEAN NOT NULL
);

CREATE TABLE GAMIFICATION.task_rule (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    min_experience_to_active INTEGER NOT NULL,
    is_active BOOLEAN NOT NULL,
    experience FLOAT NOT NULL
);


CREATE TABLE GAMIFICATION.task (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    id_company UUID NOT NULL,
    id_category UUID NOT NULL,
    name VARCHAR(120) NOT NULL,
    description VARCHAR(1080) NOT NULL,
    is_active BOOLEAN NOT NULL,
    id_rule_task UUID NOT NULL,
    FOREIGN KEY (id_company) REFERENCES GAMIFICATION.company(id),
    FOREIGN KEY (id_category) REFERENCES GAMIFICATION.category_task(id),
    FOREIGN KEY (id_rule_task) REFERENCES GAMIFICATION.task_rule(id)
);

CREATE TABLE GAMIFICATION.task_user (
    id_platform_user UUID NOT NULL,
    id_task UUID NOT NULL,
    FOREIGN KEY (id_platform_user) REFERENCES GAMIFICATION.platform_user(id),
    FOREIGN KEY (id_task) REFERENCES GAMIFICATION.task(id)
);


CREATE TABLE GAMIFICATION.badge_user (
    id_user UUID NOT NULL,
    id_badge UUID NOT NULL,
    FOREIGN KEY (id_user) REFERENCES GAMIFICATION.platform_user(id),
    FOREIGN KEY (id_badge) REFERENCES GAMIFICATION.badge(id)
);

-- Criar função que atualiza os campos created_at e updated_at
CREATE OR REPLACE FUNCTION update_timestamps()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    IF TG_OP = 'INSERT' THEN
        NEW.created_at = CURRENT_TIMESTAMP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para cada tabela
CREATE TRIGGER set_timestamps
BEFORE INSERT OR UPDATE ON company
FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER set_timestamps
BEFORE INSERT OR UPDATE ON category_company
FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER set_timestamps
BEFORE INSERT OR UPDATE ON platform_user
FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER set_timestamps
BEFORE INSERT OR UPDATE ON assessment_rule
FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER set_timestamps
BEFORE INSERT OR UPDATE ON category_event
FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER set_timestamps
BEFORE INSERT OR UPDATE ON assessment
FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER set_timestamps
BEFORE INSERT OR UPDATE ON skill
FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER set_timestamps
BEFORE INSERT OR UPDATE ON category_skill
FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER set_timestamps
BEFORE INSERT OR UPDATE ON rule_experience
FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER set_timestamps
BEFORE INSERT OR UPDATE ON badge
FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER set_timestamps
BEFORE INSERT OR UPDATE ON rule_badge_unlock
FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER set_timestamps
BEFORE INSERT OR UPDATE ON user_experience
FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER set_timestamps
BEFORE INSERT OR UPDATE ON level_rule
FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER set_timestamps
BEFORE INSERT OR UPDATE ON category_task
FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER set_timestamps
BEFORE INSERT OR UPDATE ON task
FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER set_timestamps
BEFORE INSERT OR UPDATE ON task_user
FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER set_timestamps
BEFORE INSERT OR UPDATE ON task_rule
FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER set_timestamps
BEFORE INSERT OR UPDATE ON badge_user
FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER set_timestamps
BEFORE INSERT OR UPDATE ON category_level
FOR EACH ROW EXECUTE FUNCTION update_timestamps();




ALTER TABLE gamification.rule_badge_unlock ADD COLUMN id UUID;
UPDATE gamification.rule_badge_unlock SET id = gen_random_uuid();

ALTER TABLE gamification.task_user ADD COLUMN id UUID;
UPDATE gamification.task_user SET id = gen_random_uuid();

ALTER TABLE gamification.user_experience ADD COLUMN id UUID;
UPDATE gamification.user_experience SET id = gen_random_uuid();

