require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const { connectToDatabase, validateConnection, getDbPath } = require('./db/connection');

// Import routes
const countriesRoutes = require('./api/routes/countries');
const universitiesRoutes = require('./api/routes/universities');
// Import other routes as needed
const authRoutes = require('./api/routes/auth');
const userRoutes = require('./api/routes/user');
const preferencesRoutes = require('./api/routes/preferences');
const citiesRoutes = require('./api/routes/cities');
// const healthRoutes = require('./api/routes/health');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
let db;
const connectWithRetry = async () => {
  try {
    db = await connectToDatabase();
    console.log('Database connected successfully');
    
    // Set up session middleware using SQLite
    if (process.env.USE_SESSIONS === 'true') {
      const SQLiteStore = require('connect-sqlite3')(session);
      app.use(session({
        store: new SQLiteStore({
          db: 'sessions.db',
          dir: path.dirname(getDbPath())
        }),
        secret: process.env.SESSION_SECRET || 'student-dss-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 // 1 day
        }
      }));
    }
  } catch (err) {
    console.error('Database connection failed:', err);
    console.log('Retrying in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  }
};

// Static files if needed
app.use(express.static(path.join(__dirname, 'public')));

// Debug middleware - log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/countries', countriesRoutes);
app.use('/api/universities', universitiesRoutes);
// Use other routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/preferences', preferencesRoutes);
app.use('/api/cities', citiesRoutes);

// Health check route
app.get('/api/health', async (req, res) => {
  const dbStatus = await validateConnection();
  res.json({
    status: 'ok',
    timestamp: new Date(),
    database: dbStatus ? 'connected' : 'disconnected'
  });
});

// API root to show available endpoints
app.get('/api', (req, res) => {
  res.json({
    message: 'Student DSS API is running',
    endpoints: [
      '/api/health',
      '/api/auth/login',
      '/api/auth/logout',
      '/api/auth/status',
      '/api/countries',
      '/api/universities',
      '/api/user/profile',
      '/api/user/preferences',
      '/api/preferences',
      '/api/cities'
    ]
  });
});

// Serve the static files from the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server with error handling
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Connect to database
  connectWithRetry();
});

// Add error handler for the server itself
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please use a different port.`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});
