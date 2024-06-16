CREATE TABLE IF NOT EXISTS people (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    birth_date DATE NOT NULL
);

SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';

SELECT column_name, data_type, is_nullable, column_default
	FROM information_schema.columns
	WHERE table_schema = 'public'
  	AND table_name = 'people' 


