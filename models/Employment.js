const sqlite3 = require('sqlite3').verbose();
const { getDbPath } = require('../db/connection');

class Employment {
  static getDb() {
    return new sqlite3.Database(getDbPath());
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      const db = this.getDb();
      db.get('SELECT * FROM employment WHERE id = ?', [id], (err, row) => {
        db.close();
        if (err) {
          console.error('Error in Employment.findById:', err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static async find(filter = {}) {
    return new Promise((resolve, reject) => {
      const db = this.getDb();
      let query = 'SELECT * FROM employment WHERE 1=1';
      const values = [];
      
      if (filter.country) {
        query += ' AND country = ?';
        values.push(filter.country);
      }
      
      if (filter.field) {
        query += ' AND field = ?';
        values.push(filter.field);
      }
      
      if (filter.city) {
        query += ' AND city = ?';
        values.push(filter.city);
      }
      
      db.all(query, values, (err, rows) => {
        db.close();
        if (err) {
          console.error('Error in Employment.find:', err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = Employment;
