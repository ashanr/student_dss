-- Initialize PostgreSQL database and create necessary tables

-- Create required tables
CREATE TABLE IF NOT EXISTS countries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    flag VARCHAR(10),
    region VARCHAR(50),
    score INTEGER,
    cost INTEGER,
    quality NUMERIC(3, 1),
    safety NUMERIC(3, 1),
    visa_ease VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS universities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    global_ranking INTEGER,
    domestic_ranking INTEGER,
    tuition_international INTEGER,
    tuition_domestic INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS programs (
    id SERIAL PRIMARY KEY,
    university_id INTEGER REFERENCES universities(id),
    name VARCHAR(200) NOT NULL,
    field VARCHAR(100),
    level VARCHAR(50),
    language VARCHAR(50),
    duration INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    cost_of_living_index INTEGER,
    quality_of_life_index INTEGER,
    student_friendly_score INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'guest',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    academic JSONB,
    financial JSONB,
    location JSONB,
    lifestyle JSONB,
    weights JSONB,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_countries_name ON countries(name);
CREATE INDEX idx_universities_name ON universities(name);
CREATE INDEX idx_universities_country ON universities(country);
CREATE INDEX idx_programs_university ON programs(university_id);
CREATE INDEX idx_programs_field ON programs(field);
CREATE INDEX idx_cities_country ON cities(country);
CREATE INDEX idx_cities_name ON cities(name);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);

-- Insert admin user for testing
INSERT INTO users (username, email, password, role)
VALUES 
('admin', 'admin@studentdss.com', '$2a$10$JvCo4hj9qQdqJV3jNcAJSO6Zk3eOTvNs9h1LeqPheGr9JInRH9Fse', 'admin'),
('guest', 'guest@studentdss.com', '$2a$10$CuxKQrJpS0Q8jK9CQkCnIOe8t6myi7fTjDpjzW7JuZEPEQTAqJiA6', 'guest')
ON CONFLICT (username) DO NOTHING;
