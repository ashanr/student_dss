const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, '..', 'data', 'studentDSS.db');

// Ensure the data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log(`Created data directory: ${dataDir}`);
}

// Check if database file already exists
const dbExists = fs.existsSync(dbPath);
if (dbExists) {
  console.log(`Database already exists at ${dbPath}, skipping initialization.`);
  process.exit(0);
}

console.log(`Initializing new database at ${dbPath}`);

// Connect to SQLite database (will create if doesn't exist)
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err);
    process.exit(1);
  }
  console.log('Connected to SQLite database');

  // Enable foreign keys
  db.run('PRAGMA foreign_keys = ON');

  // Create tables
  db.serialize(() => {
    // Sessions table
    db.run(`
      CREATE TABLE IF NOT EXISTS sessions (
        sid TEXT PRIMARY KEY,
        sess TEXT NOT NULL,
        expire INTEGER NOT NULL
      )
    `);
    db.run('CREATE INDEX IF NOT EXISTS idx_sessions_expire ON sessions(expire)');

    // Countries table
    db.run(`
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
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Universities table
    db.run(`
      CREATE TABLE IF NOT EXISTS universities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        country TEXT,
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
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(country) REFERENCES countries(id)
      )
    `);
    db.run('CREATE INDEX IF NOT EXISTS idx_universities_country ON universities(country)');

    // Cities table
    db.run(`
      CREATE TABLE IF NOT EXISTS cities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        country TEXT NOT NULL,
        cost_of_living_index INTEGER,
        quality_of_life_index INTEGER,
        student_friendly_score INTEGER,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(country) REFERENCES countries(id)
      )
    `);
    db.run('CREATE INDEX IF NOT EXISTS idx_cities_country ON cities(country)');

    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert default users
    const insertUsers = db.prepare(`
      INSERT OR IGNORE INTO users (username, email, password, role)
      VALUES (?, ?, ?, ?)
    `);
    
    // Create hashed passwords
    const adminPassword = bcrypt.hashSync('admin', 10);
    const guestPassword = bcrypt.hashSync('guest', 10);
    
    insertUsers.run('admin', 'admin@studentdss.com', adminPassword, 'admin');
    insertUsers.run('guest', 'guest@studentdss.com', guestPassword, 'guest');
    insertUsers.finalize();

    console.log('Database initialization completed successfully');
  });

  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
      process.exit(1);
    } else {
      console.log('Database connection closed');
      process.exit(0);
    }
  });
});
