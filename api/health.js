const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const { getDbPath } = require('../db/connection');

// Health check endpoint
router.get('/', async (req, res) => {
  try {
    // Check database connection
    const db = new sqlite3.Database(getDbPath());
    
    db.get('SELECT 1 as result', [], function(err, row) {
      db.close();
      
      if (err || !row) {
        console.error('Health check error:', err);
        res.status(500).json({
          status: 'error',
          timestamp: new Date().toISOString(),
          services: {
            api: true,
            database: false
          },
          error: process.env.NODE_ENV === 'development' ? (err ? err.message : 'Unknown error') : 'Database connection failed'
        });
      } else {
        res.json({
          status: 'ok',
          timestamp: new Date().toISOString(),
          services: {
            api: true,
            database: true
          }
        });
      }
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      services: {
        api: true,
        database: false
      },
      error: process.env.NODE_ENV === 'development' ? error.message : 'Database connection failed'
    });
  }
});

module.exports = router;
