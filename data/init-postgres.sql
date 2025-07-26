-- Initialize database schema

-- Countries table
CREATE TABLE IF NOT EXISTS countries (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  flag VARCHAR(10),
  region VARCHAR(100),
  score INTEGER,
  cost INTEGER,
  quality FLOAT,
  safety FLOAT,
  visa_ease VARCHAR(50),
  highlights TEXT[],
  language VARCHAR(100),
  currency_code VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cities table
CREATE TABLE IF NOT EXISTS cities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  cost_of_living_index INTEGER,
  quality_of_life_index INTEGER,
  student_friendly_score INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Universities table
CREATE TABLE IF NOT EXISTS universities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  global_ranking INTEGER,
  national_ranking INTEGER,
  domestic_undergrad_tuition INTEGER,
  domestic_graduate_tuition INTEGER,
  international_undergrad_tuition INTEGER,
  international_graduate_tuition INTEGER,
  programs TEXT,
  acceptance_rate FLOAT,
  student_faculty_ratio TEXT,
  website TEXT,
  facilities TEXT,
  accommodation_available BOOLEAN,
  accommodation_cost INTEGER,
  scholarships TEXT,
  international_students INTEGER,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Programs table
CREATE TABLE IF NOT EXISTS programs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  university_id INTEGER REFERENCES universities(id),
  university_name VARCHAR(255),
  level VARCHAR(50),
  field VARCHAR(100),
  specialization VARCHAR(255),
  description TEXT,
  duration_years INTEGER,
  duration_semesters INTEGER,
  credits INTEGER,
  teaching_language VARCHAR(50),
  format VARCHAR(50),
  tuition_amount INTEGER,
  tuition_currency VARCHAR(10),
  gpa_requirement FLOAT,
  language_requirement VARCHAR(100),
  acceptance_rate FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employment table
CREATE TABLE IF NOT EXISTS employment (
  id SERIAL PRIMARY KEY,
  country VARCHAR(255) NOT NULL,
  city VARCHAR(255),
  field VARCHAR(255) NOT NULL,
  year_data INTEGER,
  employment_rate_overall FLOAT,
  employment_rate_foreign FLOAT,
  salary_entry_level INTEGER,
  salary_mid_career INTEGER,
  salary_senior INTEGER,
  currency VARCHAR(10),
  job_market_demand INTEGER,
  growth_rate FLOAT,
  skills_in_demand TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert test users
INSERT INTO users (username, email, password, role)
VALUES
  ('admin', 'admin@studentdss.com', '$2a$10$JvCo4hj9qQdqJV3jNcAJSO6Zk3eOTvNs9h1LeqPheGr9JInRH9Fse', 'admin'),
  ('guest', 'guest@studentdss.com', '$2a$10$CuxKQrJpS0Q8jK9CQkCnIOe8t6myi7fTjDpjzW7JuZEPEQTAqJiA6', 'guest')
ON CONFLICT DO NOTHING;
