CREATE TABLE chefs
(
	id BIGSERIAL PRIMARY KEY,
    name TEXT,
    created_at DATE,
    updated_at DATE
);

CREATE TABLE recipes
(
    id BIGSERIAL PRIMARY KEY,
    chef_id BIGINT,
    title TEXT,
    ingredients TEXT[],
    preparation TEXT[],
    information TEXT,
	file_id BIGINT REFERENCES files(id)
    created_at DATE,
    updated_at DATE
);

CREATE TABLE files
(
  	id BIGSERIAL PRIMARY KEY,
    name TEXT,
    path TEXT NOT NULL
);

CREATE TABLE recipe_files
(
  	id BIGSERIAL PRIMARY KEY,
    recipe_id BIGINT REFERENCES recipes(id),
	file_id BIGINT REFERENCES files(id)
);

CREATE TABLE users
(
	id BIGSERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    password TEXT,
  	is_admin BOOL,
    created_at DATE,
    updated_at DATE
);

CREATE OR REPLACE FUNCTION update_date() RETURNS TRIGGER AS $$

    BEGIN
      NEW.updated_at := NOW();

      RETURN NEW;
    END;
        
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_chefs
    BEFORE UPDATE ON chefs
    FOR EACH ROW 
    EXECUTE PROCEDURE update_date();

CREATE OR REPLACE TRIGGER update_recipes
    BEFORE UPDATE ON recipes
    FOR EACH ROW 
    EXECUTE PROCEDURE update_date();

CREATE OR REPLACE TRIGGER update_users
    BEFORE UPDATE ON users
    FOR EACH ROW 
    EXECUTE PROCEDURE update_date();