const sqlite3 = require('sqlite3').verbose();
const { getDbPath } = require('../db/connection');

class Program {
  static getDb() {
    return new sqlite3.Database(getDbPath());
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      const db = this.getDb();
      db.get('SELECT * FROM programs WHERE id = ?', [id], (err, row) => {
        db.close();
        if (err) {
          console.error('Error in Program.findById:', err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static async find(filter = {}, skip = 0, limit = 20) {
    return new Promise((resolve, reject) => {
      const db = this.getDb();
      let query = 'SELECT * FROM programs WHERE 1=1';
      const values = [];
      
      if (filter.university_id) {
        query += ' AND university_id = ?';
        values.push(filter.university_id);
      }
      
      if (filter.field) {
        query += ' AND field = ?';
        values.push(filter.field);
      }
      
      if (filter.level) {
        query += ' AND level = ?';
        values.push(filter.level);
      }
      
      query += ' LIMIT ? OFFSET ?';
      values.push(limit, skip);
      
      db.all(query, values, (err, rows) => {
        db.close();
        if (err) {
          console.error('Error in Program.find:', err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  
  static async countDocuments(filter = {}) {
    return new Promise((resolve, reject) => {
      const db = this.getDb();
      let query = 'SELECT COUNT(*) as count FROM programs WHERE 1=1';
      const values = [];
      
      if (filter.university_id) {
        query += ' AND university_id = ?';
        values.push(filter.university_id);
      }
      
      if (filter.field) {
        query += ' AND field = ?';
        values.push(filter.field);
      }
      
      if (filter.level) {
        query += ' AND level = ?';
        values.push(filter.level);
      }
      
      db.get(query, values, (err, row) => {
        db.close();
        if (err) {
          console.error('Error in Program.countDocuments:', err);
          reject(err);
        } else {
          resolve(parseInt(row.count));
        }
      });
    });
  }
}

module.exports = Program;
