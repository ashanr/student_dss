/**
 * Database Connection Helper
 * Provides functions to get the SQLite database path
 */

const path = require('path');

// Get database path from environment variable or use default
function getDbPath() {
  return process.env.SQLITE_PATH || path.join(__dirname, '..', 'data', 'studentDSS.db');
}

module.exports = {
  getDbPath
};
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
