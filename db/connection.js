const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// SQLite connection path
const dbPath = process.env.SQLITE_PATH || path.join(__dirname, '..', 'data', 'studentDSS.db');

// Connect to SQLite database
const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    const connect = () => {
      try {
        // Ensure directory exists
        const dir = path.dirname(dbPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        const db = new sqlite3.Database(dbPath, (err) => {
          if (err) {
            console.error('Failed to connect to SQLite:', err);
            console.log('Retrying in 5 seconds...');
            setTimeout(connect, 5000);
            return;
          }
          console.log('SQLite connected successfully');
          resolve(db);
        });
      } catch (err) {
        console.error('Error creating SQLite connection:', err);
        console.log('Retrying in 5 seconds...');
        setTimeout(connect, 5000);
      }
    };
    
    connect();
  });
};

// Add connection validation
const validateConnection = async () => {
  return new Promise((resolve) => {
    try {
      const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          console.error('Database validation failed:', err);
          resolve(false);
          return;
        }
        
        db.get("SELECT 1", [], (err) => {
          db.close();
          if (err) {
            console.error('Database validation query failed:', err);
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    } catch (err) {
      console.error('Database validation exception:', err);
      resolve(false);
    }
  });
};

module.exports = {
  connectToDatabase,
  validateConnection,
  getDbPath: () => dbPath
};
