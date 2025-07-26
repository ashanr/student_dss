-- Initialize database tables for SQLite

-- Sessions table for connect-sqlite3
CREATE TABLE IF NOT EXISTS "sessions" (
  "sid" TEXT PRIMARY KEY,
  "sess" TEXT NOT NULL,
  "expire" INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS "IDX_sessions_expire" ON "sessions" ("expire");

-- Countries table
CREATE TABLE IF NOT EXISTS countries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  flag TEXT,
  region TEXT,
  score INTEGER,
  cost INTEGER,
  quality REAL,
  safety REAL,
  visa_ease TEXT,
  highlights TEXT,
  language TEXT,
  currency_code TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Universities table
CREATE TABLE IF NOT EXISTS universities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  country TEXT REFERENCES countries(id),
  city TEXT,
  ranking_global INTEGER,
  ranking_national INTEGER,
  tuition_fees_domestic_undergraduate INTEGER,
  tuition_fees_domestic_graduate INTEGER,
  tuition_fees_international_undergraduate INTEGER,
  tuition_fees_international_graduate INTEGER,
  programs TEXT,
  acceptance_rate REAL,
  student_faculty_ratio TEXT,
  website TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cities table
CREATE TABLE IF NOT EXISTS cities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  cost_of_living_index INTEGER,
  quality_of_life_index INTEGER,
  student_friendly_score INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_universities_country ON universities(country);
CREATE INDEX IF NOT EXISTS idx_cities_country ON cities(country);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert test users
INSERT OR IGNORE INTO users (username, email, password, role)
VALUES
  ('admin', 'admin@studentdss.com', '$2a$10$JvCo4hj9qQdqJV3jNcAJSO6Zk3eOTvNs9h1LeqPheGr9JInRH9Fse', 'admin'),
  ('guest', 'guest@studentdss.com', '$2a$10$CuxKQrJpS0Q8jK9CQkCnIOe8t6myi7fTjDpjzW7JuZEPEQTAqJiA6', 'guest');
