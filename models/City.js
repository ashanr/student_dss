const sqlite3 = require('sqlite3').verbose();
const { getDbPath } = require('../db/connection');

class City {
  static getDb() {
    return new sqlite3.Database(getDbPath());
  }

  static async findAll() {
    return new Promise((resolve, reject) => {
      const db = this.getDb();
      db.all('SELECT * FROM cities', [], (err, rows) => {
        db.close();
        if (err) {
          console.error('Error in City.findAll:', err);
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
      db.get('SELECT * FROM cities WHERE id = ?', [id], (err, row) => {
        db.close();
        if (err) {
          console.error('Error in City.findById:', err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static async findByCountry(country) {
    return new Promise((resolve, reject) => {
      const db = this.getDb();
      db.all('SELECT * FROM cities WHERE country = ?', [country], (err, rows) => {
        db.close();
        if (err) {
          console.error('Error in City.findByCountry:', err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = City;
