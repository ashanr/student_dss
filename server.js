const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const { validateConnection } = require('./db/connection');
const { Pool } = require('pg');

// Import routes
const authRoutes = require('./api/routes/auth');
const userRoutes = require('./api/routes/user');
const preferencesRoutes = require('./api/routes/preferences');
const countriesRoutes = require('./api/routes/countries');
const universitiesRoutes = require('./api/routes/universities');
const citiesRoutes = require('./api/routes/cities');

// Load environment variables if needed
require('dotenv').config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection with proper error handling
const POSTGRES_URI = process.env.POSTGRES_URI || 'postgres://postgres:password@localhost:5432/studentDSS';

// Connect to PostgreSQL with retry logic
const pool = new Pool({
  connectionString: POSTGRES_URI,
});

const connectWithRetry = () => {
  console.log('Attempting to connect to PostgreSQL...');
  pool.connect()
    .then(client => {
      console.log('PostgreSQL connected successfully');
      client.release();
    })
    .catch(err => {
      console.error('PostgreSQL connection error:', err);
      console.log('Retrying connection in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware using PostgreSQL
const pgSession = require('connect-pg-simple')(session);
app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: 'sessions'
    }),
    secret: process.env.SESSION_SECRET || 'student-dss-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/preferences', preferencesRoutes);
app.use('/api/countries', countriesRoutes);
app.use('/api/universities', universitiesRoutes);
app.use('/api/cities', citiesRoutes);

// Health check route
app.get('/api/health', async (req, res) => {
  const isDbConnected = await validateConnection();
  
  if (isDbConnected) {
    return res.status(200).json({ status: 'ok', database: 'connected' });
  } else {
    return res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

// Serve the static files from the React app for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong on the server',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
