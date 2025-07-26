const sqlite3 = require('sqlite3').verbose();
const { getDbPath } = require('../db/connection');

class Country {
  static getDb() {
    return new sqlite3.Database(getDbPath());
  }

  static async findAll() {
    return new Promise((resolve, reject) => {
      const db = this.getDb();
      db.all('SELECT * FROM countries', [], (err, rows) => {
        db.close();
        if (err) {
          console.error('Error in Country.findAll:', err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      const db = this.getDb();
      db.get('SELECT * FROM countries WHERE id = ?', [id], (err, row) => {
        db.close();
        if (err) {
          console.error('Error in Country.findById:', err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static async findByName(name) {
    return new Promise((resolve, reject) => {
      const db = this.getDb();
      db.get('SELECT * FROM countries WHERE name = ?', [name], (err, row) => {
        db.close();
        if (err) {
          console.error('Error in Country.findByName:', err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

module.exports = Country;
