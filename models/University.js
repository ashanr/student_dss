const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { getDbPath } = require('../db/connection');

class University {
  static getDb() {
    return new sqlite3.Database(getDbPath());
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      const db = this.getDb();
      db.get('SELECT * FROM universities WHERE id = ?', [id], (err, row) => {
        db.close();
        if (err) {
          console.error('Error in University.findById:', err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
  
  static async find(filter = {}, skip = 0, limit = 20, sort = {}) {
    return new Promise((resolve, reject) => {
      const db = this.getDb();
      let query = 'SELECT * FROM universities WHERE 1=1';
      const values = [];
      
      // Build filter conditions
      if (filter.country) {
        query += ' AND country = ?';
        values.push(filter.country);
      }
      
      // Handle ranking filter
      if (filter.ranking && filter.ranking.max) {
        query += ' AND ranking_global <= ?';
        values.push(filter.ranking.max);
      }
      
      // Add sorting
      if (sort.ranking === 'asc') {
        query += ' ORDER BY ranking_global ASC';
      } else if (sort.ranking === 'desc') {
        query += ' ORDER BY ranking_global DESC';
      }
      
      // Add pagination
      query += ' LIMIT ? OFFSET ?';
      values.push(limit, skip);
      
      db.all(query, values, (err, rows) => {
        db.close();
        if (err) {
          console.error('Error in University.find:', err);
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
      let query = 'SELECT COUNT(*) as count FROM universities WHERE 1=1';
      const values = [];
      
      // Build filter conditions
      if (filter.country) {
        query += ' AND country = ?';
        values.push(filter.country);
      }
      
      // Handle ranking filter
      if (filter.ranking && filter.ranking.max) {
        query += ' AND ranking_global <= ?';
        values.push(filter.ranking.max);
      }
      
      db.get(query, values, (err, row) => {
        db.close();
        if (err) {
          console.error('Error in University.countDocuments:', err);
          reject(err);
        } else {
          resolve(parseInt(row.count));
        }
      });
    });
  }
}

module.exports = University;
