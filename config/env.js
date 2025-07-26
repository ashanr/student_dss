/**
 * Centralized environment configuration
 */
require('dotenv').config();

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || '0.0.0.0',
  dbPath: process.env.SQLITE_PATH || './data/studentDSS.db',
  jwtSecret: process.env.JWT_SECRET || 'default-jwt-secret-key-change-in-production',
  sessionSecret: process.env.SESSION_SECRET || 'default-session-secret-change-in-production',
  useSessions: process.env.USE_SESSIONS === 'true',
  // Add other environment variables here
};
