/**
 * Centralized route registration
 */
const express = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const countriesRoutes = require('./countries');
const universitiesRoutes = require('./universities');
const preferencesRoutes = require('./preferences');
const citiesRoutes = require('./cities');
const healthRoutes = require('./health');

const router = express.Router();

// Register all routes
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/countries', countriesRoutes);
router.use('/universities', universitiesRoutes);
router.use('/preferences', preferencesRoutes);
router.use('/cities', citiesRoutes);
router.use('/health', healthRoutes);

module.exports = router;
