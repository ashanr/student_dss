const { Pool } = require('pg');

// PostgreSQL connection with retry functionality
const connectToPostgreSQL = (connectionString) => {
  return new Promise((resolve, reject) => {
    const connect = () => {
      const pool = new Pool({
        connectionString: connectionString,
      });
      
      pool.connect()
        .then(client => {
          console.log('PostgreSQL connected successfully');
          client.release();
          resolve(pool);
        })
        .catch(err => {
          console.error('Failed to connect to PostgreSQL:', err);
          console.log('Retrying in 5 seconds...');
          setTimeout(connect, 5000);
        });
    };
    
    connect();
  });
};

// Add connection validation
const validateConnection = async () => {
  try {
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URI || 'postgres://postgres:password@localhost:5432/studentDSS',
    });
    
    // Try to get a client from the pool
    const client = await pool.connect();
    client.release();
    return true;
  } catch (err) {
    console.error('Database validation failed:', err);
    return false;
  }
};

module.exports = {
  connectToPostgreSQL,
  validateConnection
};
    connect();
  });
};

// Add connection validation
const validateConnection = async () => {
  try {
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URI || 'postgres://postgres:password@localhost:5432/studentDSS',
    });
    
    // Try to get a client from the pool
    const client = await pool.connect();
    client.release();
    return true;
  } catch (err) {
    console.error('Database validation failed:', err);
    return false;
  }
};

module.exports = {
  connectToMongoDB,
  connectToPostgreSQL,
  validateConnection
};
