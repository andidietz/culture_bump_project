CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL CHECK (position('@' IN email) > 1)
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    tag TEXT NOT NULL UNIQUE
);

CREATE TABLE header_situations (
    id SERIAL PRIMARY KEY,
    header_situation TEXT NOT NULL UNIQUE
);

CREATE TABLE header_specifications (
    id SERIAL PRIMARY KEY,
    header_specification TEXT NOT NULL UNIQUE
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL UNIQUE
);

CREATE TABLE subcategories (
    id SERIAL PRIMARY KEY,
    subcategory TEXT NOT NULL UNIQUE
);

CREATE TABLE reference_points (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    sparker TEXT NOT NULL,
    thought TEXT NOT NULL,
    observation TEXT NOT NULL,
    response TEXT NOT NULL,
    emotions TEXT NOT NULL,
    universal TEXT NOT NULL,
    action TEXT NOT NULL,
    qualities TEXT NOT NULL,
    connection_point TEXT NOT NULL,
    inDirectory BOOLEAN DEFAULT false,
    user_id VARCHAR(25)
        REFERENCES users ON DELETE CASCADE,
    header_situation_id INTEGER
        REFERENCES header_situations ON DELETE CASCADE,
    header_specification_id INTEGER
        REFERENCES header_specifications ON DELETE CASCADE,
    header_tag_id INTEGER
        REFERENCES tags ON DELETE CASCADE,
    category_id INTEGER
        REFERENCES categories ON DELETE CASCADE,
    subcategory_id INTEGER  
        REFERENCES subcategories ON DELETE CASCADE   
);

CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY,
    user_id TEXT
        REFERENCES users ON DELETE CASCADE,
    reference_point_id INTEGER
        REFERENCES reference_points ON DELETE CASCADE,
    is_header_tag BOOLEAN
);

CREATE TABLE tags_reference_points (
    id SERIAL PRIMARY KEY,
    tag_id INTEGER
        REFERENCES tags ON DELETE CASCADE,
    reference_point_id INTEGER
        REFERENCES reference_points ON DELETE CASCADE
);

CREATE TABLE users_tags (
    id SERIAL PRIMARY KEY,
    user_id TEXT
        REFERENCES users ON DELETE CASCADE,
    tag_id INTEGER
        REFERENCES tags ON DELETE CASCADE   
);